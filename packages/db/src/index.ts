import 'dotenv/config';
import http from "http";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import { expressMiddleware } from '@apollo/server/express4';
import cors from "cors";
import bodyParser from "body-parser";
import { schema } from "./graphql/schema";
import { createContext } from "./context";

const app = express();

const PORT = 4000;

const startServer = async () => {
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  
  await startStandaloneServer(server, {
    listen: { port: PORT },
    context: createContext
  });

  app.use(
    cors(),
    bodyParser.json(),
    expressMiddleware(server),
  );

  console.log(`🚀 Server ready at: http://localhost:${PORT}/`);
}

startServer();

export default app;
