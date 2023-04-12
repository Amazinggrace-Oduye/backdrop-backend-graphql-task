"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const builder_1 = require("../graphql/builder");
builder_1.builder.queryField("users", (t) => t.prismaField({
    type: ["User"],
    resolve: async (query, _root, _args, _ctx, _info) => {
        return db_1.prisma.user.findMany({ ...query });
    },
}));
//# sourceMappingURL=user_service.js.map