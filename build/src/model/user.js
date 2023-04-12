"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paystack_1 = require("../remote/paystack");
const db_1 = require("../config/db");
const builder_1 = require("../graphql/builder");
const util_services_1 = require("../helpers/util-services");
builder_1.builder.prismaObject("User", {
    fields: (t) => ({
        id: t.exposeID("id"),
        name: t.exposeString("name"),
        is_verified: t.exposeBoolean("is_verified"),
        banks: t.relation("Banks"),
        createdAt: t.expose("createdAt", {
            type: "Date",
        }),
        updatedAt: t.expose("updatedAt", {
            type: "Date",
        }),
    }),
});
builder_1.builder.queryField("users", (t) => t.prismaField({
    type: ["User"],
    resolve: async (query, _root, _args, _ctx, _info) => {
        return db_1.prisma.user.findMany({ ...query });
    },
}));
builder_1.builder.queryField("user", (t) => t.prismaField({
    type: "User",
    nullable: true,
    args: {
        id: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, args, _info) => db_1.prisma.user.findFirst({
        ...query,
        where: {
            id: args.id,
        },
    }),
}));
builder_1.builder.mutationField("updateUser", (t) => t.prismaField({
    type: "User",
    nullable: true,
    args: {
        id: t.arg.string({ required: true }),
        name: t.arg.string(),
        is_verified: t.arg.boolean(),
    },
    resolve: async (query, _parent, args, _ctx) => {
        const findQueryId = db_1.prisma.user.findFirst({
            where: { id: args.id },
        });
        if (!findQueryId)
            throw new Error("user not found");
        return db_1.prisma.user.update({
            ...query,
            where: {
                id: args.id,
            },
            data: {
                ...findQueryId,
                name: args.name || undefined,
                is_verified: args.is_verified || undefined,
                updatedAt: new Date(),
            },
        });
    },
}));
builder_1.builder.mutationField("verifyUser", (t) => t.prismaField({
    type: "User",
    nullable: true,
    args: {
        id: t.arg.string({ required: true }),
        account_number: t.arg.string({ required: true }),
        bank_name: t.arg.string({ required: true }),
        bank_code: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
        const response = (await paystack_1.RemotePaystackSevice.verifyAccountNumber({
            account_number: args.account_number,
            bank_code: args.bank_code,
            bank_name: args.bank_name,
        }));
        console.log({ response });
        if (!(response === null || response === void 0 ? void 0 : response.data.account_name)) {
            throw new Error("user account detail not found");
        }
        const dist = util_services_1.UtilService.getLlevenshteinDistance(args.bank_name, response.data.account_name);
        console.log(dist);
        if (dist > 2) {
            throw new Error(`user not verified levinstine ${dist} `);
        }
        const findQueryId = db_1.prisma.user.findFirst({
            where: { id: args.id },
        });
        if (!findQueryId)
            throw new Error("user not found");
        return db_1.prisma.user.update({
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
}));
builder_1.builder.queryField("verifyUserName", (t) => t.prismaField({
    type: "User",
    nullable: true,
    args: {
        id: t.arg.string({ required: true }),
        account_number: t.arg.string({ required: true }),
        bank_name: t.arg.string(),
        bank_code: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
        const user = db_1.prisma.user.findFirst({
            where: { id: args.id },
        });
        if (!user)
            throw new Error("user not found");
        console.log({ user });
        const response = (await paystack_1.RemotePaystackSevice.verifyAccountNumber({
            account_number: args.account_number,
            bank_code: args.bank_code,
        }));
        console.log({ response });
        if (!(response === null || response === void 0 ? void 0 : response.data.account_name)) {
            throw new Error("user account detail not found");
        }
        return db_1.prisma.user.update({
            ...query,
            where: {
                id: args.id,
            },
            data: {
                ...user,
                is_verified: true,
            },
        });
    },
}));
//# sourceMappingURL=user.js.map