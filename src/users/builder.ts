import SchemaBuilder from "@pothos/core";

import { DateResolver } from "graphql-scalars";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import { prisma } from "../config/db";

export const builder = new SchemaBuilder<{
  DefaultFieldNullability: true;
  Scalars: {
    Date: { Input: Date; Output: Date };
  };
  PrismaTypes: PrismaTypes;
}>({
  defaultFieldNullability: true,
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
});

builder.addScalarType("Date", DateResolver, {});
builder.queryType({});
builder.mutationType({});
