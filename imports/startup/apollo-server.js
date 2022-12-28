//서버설정
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebApp } from 'meteor/webapp';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

//발행추가
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from "subscriptions-transport-ws";

//사용자인증추가
import { getUser } from "meteor/apollo";

//서버설정(리졸버,스키마)
import resolverItem from '/imports/api/item/resolvers';
import typeDefsItem from '/imports/api/item/schemas';
import resolverOrder from '/imports/api/order/resolvers';
import typeDefsOrder from '/imports/api/order/schemas';
import resolverAuth from "/imports/api/auth/resolvers";
import typeDefsAuth from "/imports/api/auth/schemas";

(async function(){
  const resolvers = [resolverItem, resolverOrder, resolverAuth];
  const typeDefs = [typeDefsItem, typeDefsOrder, typeDefsAuth];

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  //발행추가
  const subscriptionServer = SubscriptionServer.create({
    schema,
    execute,
    subscribe,
    onConnect: async(connectionParams, webSocket, context ) => {
      console.log(`Subscription clent connected using new SubscriptionServer`);
    },
    onDisconnect: async(webSocket, context) => {
      console.log(`Subscription client disconnected`);
    }
    },
    {
      server: WebApp.httpServer,
      path:'/graphql',
    });

  const server = new ApolloServer({
    playground: true,
    schema,
    context: async({req}) => ({
      user: await getUser(req.headers.authorization),
      userToken: req.headers.authorization,
    }),
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),

      //발행추가
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            }
          }
        }
      }
    ],
  });

  await server.start();

  server.applyMiddleware({
    app: WebApp.connectHandlers,
    cors: true,
    path: '/graphql',
  });

})();