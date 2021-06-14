import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { PingResolver } from "./resolvers/ping";
import { UserResolver } from "./resolvers/users";
import { EmployeeResolver } from './resolvers/employees';
import { UserTypeResolver } from './resolvers/userTypes';

export async function startServer() {

  const app = express();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        PingResolver,
        UserResolver,
        EmployeeResolver,
        UserTypeResolver
      ],
      validate: false
    }),
    context: ({ req, res }) => ({ req, res })
  });

  server.applyMiddleware({ app, path: "/graphql" });

  return app;
}