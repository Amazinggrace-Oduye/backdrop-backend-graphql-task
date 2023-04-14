import { builder } from "./builder";
// import "../graphql/model/user";
import "./resolvers";

// enerates an abstract syntax tree of the user schema
export const schema = builder.toSchema({});
