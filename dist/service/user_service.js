import { prisma } from "../config/db";
import { builder } from "../graphql/builder";
builder.queryField("users", (t) => t.prismaField({
    type: ["User"],
    resolve: async (query, _root, _args, _ctx, _info) => {
        return prisma.user.findMany({ ...query });
    },
}));
//# sourceMappingURL=user_service.js.map