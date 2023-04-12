"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.builder = void 0;
const core_1 = __importDefault(require("@pothos/core"));
const graphql_scalars_1 = require("graphql-scalars");
const plugin_prisma_1 = __importDefault(require("@pothos/plugin-prisma"));
const db_1 = require("../config/db");
exports.builder = new core_1.default({
    plugins: [plugin_prisma_1.default],
    prisma: {
        client: db_1.prisma,
    },
});
exports.builder.addScalarType("Date", graphql_scalars_1.DateResolver, {});
exports.builder.queryType({});
exports.builder.mutationType({});
//# sourceMappingURL=builder.js.map