import express from 'express';
import path from 'path';
// import { ApolloServer } from 'apollo-server-express';
import db from './config/connection.js'
const PORT = process.env.PORT || 3001;
import { createServer } from 'http';
// import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { execute, subscribe } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
export const pubsub = new PubSub();
import { SubscriptionServer } from 'subscriptions-transport-ws';
import typeDefs from './typeDefs/schema.js';
import resolvers from './resolvers/index.js';
import { makeExecutableSchema } from '@graphql-tools/schema'

// server.applyMiddleware({ app });
const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const httpServer = createServer(app);
const server = new ApolloServer({
  schema,
});

const startApolloServer = async () => {
  await server.start();
  return server.applyMiddleware({ app });
};

startApolloServer();

const subscriptionServer = SubscriptionServer.create(
  {
    // This is the `schema` we just created.
    schema,
    // These are imported from `graphql`.
    execute,
    subscribe,
    onConnect(connectionParams, webSocket, context) {
      console.log('Connected!');
    },
    onDisconnect(webSocket, context) {
      console.log('Disconnected!');
    },
  },
  {
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // This `server` is the instance returned from `new ApolloServer`.
    path: server.graphqlPath,
  }
);



// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, () => subscriptionServer.close());
});

db.once('open', () => {
  httpServer.listen(PORT, () => {
    if (process.env.NODE_ENV === 'production') {
      console.log('Production server started!');
    } else {
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    }
  })
});