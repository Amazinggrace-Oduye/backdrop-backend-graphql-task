import { RemotePaystackSevice } from "../remote/paystack";
import { IPaystack } from "../types/paystack";
import { prisma } from "../config/db";
import { builder } from "./builder";
import { UtilService } from "../helpers/util-services";

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    first_name: t.exposeString("first_name"),
    last_name: t.exposeString("last_name"),
    middle_name: t.exposeString("middle_name"),
    is_verified: t.exposeBoolean("is_verified"),
    createdAt: t.expose("createdAt", {
      type: "Date",
    }),
    updatedAt: t.expose("updatedAt", {
      type: "Date",
    }),
  }),
});

builder.queryField("users", (t) =>
  // 2
  t.prismaField({
    // 3
    type: ["User"],
    // 4
    resolve: async (query, _root, _args, _ctx, _info) => {
      return prisma.user.findMany({ ...query });
    },
  })
);

builder.mutationField("updateUser", (t) =>
  t.prismaField({
    type: "User",
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
      name: t.arg.string(),
      is_verified: t.arg.boolean(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const findQueryId = prisma.user.findFirst({
        where: { id: args.id },
      });
      if (!findQueryId) throw new Error("user not found");

      return prisma.user.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          ...findQueryId,
          is_verified: args.is_verified || undefined,
        },
      });
    },
  })
);

builder.mutationField("verifyUserName", (t) =>
  t.prismaField({
    type: "User",
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
      account_number: t.arg.string({ required: true }),
      account_name: t.arg.string({ required: true }),
      bank_code: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const response = (await RemotePaystackSevice.verifyAccountNumber({
        account_number: args.account_number,
        bank_code: args.bank_code,
      })) as IPaystack;
      if (!response?.data.account_name) {
        throw new Error("user account detail not found");
      }
      const dist = UtilService.getLlevenshteinDistance(
        args.account_name,
        response.data.account_name
      );
      if (dist > 2) {
        throw new Error(`user not verified levinstine ${dist} `);
      }
      const findQueryId = await prisma.user.findFirst({
        where: { id: args.id },
      });
      if (!findQueryId?.id) throw new Error("user not found");

      return prisma.user.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          ...findQueryId,
          is_verified: true,
        },
      });
    },
  })
);

builder.queryField("getAccountName", (t) =>
  t.prismaField({
    type: "User",
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
      account_number: t.arg.string({ required: true }),
      bank_name: t.arg.string(),
      bank_code: t.arg.string({ required: true }),
    },
    resolve: async (_query, _parent, args, _ctx) => {
      const user = await prisma.user.findFirst({
        where: { id: args.id },
      });
      if (!user?.first_name) throw new Error("user not found");
      const { first_name, last_name, middle_name } = user;
      /** TODO Match Name in any other  */
      const name = `${first_name} ${middle_name} ${last_name} `;
      // if user is not verified call paystack
      if (user.is_verified) user;

      const response = (await RemotePaystackSevice.verifyAccountNumber({
        account_number: args.account_number,
        bank_code: args.bank_code,
      })) as IPaystack;

      if (!response?.data.account_name) {
        throw new Error("user account detail not found");
      }

      const dist = UtilService.getLlevenshteinDistance(
        name,
        response.data.account_name
      );
      if (dist > 2) {
        throw new Error(`user not verified name verification failed`);
      }
      return user;
    },
  })
);
