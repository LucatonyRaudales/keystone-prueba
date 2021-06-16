import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { TypeResolver } from "./resolvers/typesResolver";
import { EmployeesResolver } from "./resolvers/EmployeesResolver";
import { DropResolver } from "./resolvers/drop";

export async function startServer() {

  const app = express();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TypeResolver,EmployeesResolver, DropResolver],
      validate: false
    }),
    context: ({ req, res }) => ({ req, res })
  });

  server.applyMiddleware({ app, path: "/graphql" });

  return app;
}
