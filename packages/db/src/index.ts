import 'dotenv/config';

import http from 'http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { startStandaloneServer } from '@apollo/server/standalone';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { createContext } from './graphql/context';
import { schema } from './graphql/schema';

const app = express();

const PORT = 4000;

const startServer = async () => {
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema: schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await startStandaloneServer(server, {
    listen: { port: PORT },
    context: createContext,
  });

  app.use(cors(), bodyParser.json(), expressMiddleware(server));

  console.log(`🚀 Server ready at: http://localhost:${PORT}/`);
};

void startServer();

export default app;
