import "reflect-metadata";
import { PrismaClient } from "@prisma/client";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";

import { resolvers } from "./generated/type-graphql";

const prisma = new PrismaClient();

async function bootstrap() {
  const schema = await buildSchema({
    resolvers,
    validate: true,
  });

  const server = new ApolloServer({
    schema,
    context: () => ({ prisma }),
  })

  const { url } = await server.listen(3000);

  console.log(`🚀  Server ready at ${url}`);
}

bootstrap()
