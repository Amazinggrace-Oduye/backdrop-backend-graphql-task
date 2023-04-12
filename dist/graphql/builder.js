import SchemaBuilder from "@pothos/core";
import { DateResolver } from "graphql-scalars";
import PrismaPlugin from "@pothos/plugin-prisma";
import { prisma } from "../config/db";
export const builder = new SchemaBuilder({
    plugins: [PrismaPlugin],
    prisma: {
        client: prisma,
    },
});
builder.addScalarType("Date", DateResolver, {});
builder.queryType({});
builder.mutationType({});
//# sourceMappingURL=builder.js.map