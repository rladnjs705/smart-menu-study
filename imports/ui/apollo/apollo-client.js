import { ApolloClient, InMemoryCache, split } from "@apollo/client/core";
import { HttpLink, ApolloLink, from } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";//쿼리 속성 확인

const httpLink = new HttpLink({
    uri: "http://localhost:3000/graphql"
});

const wsLink = new WebSocketLink({
    uri: "ws://localhost:3000/graphql"
});

const authLink = new ApolloLink((operation, forward) => {
    return forward(operation);
});

const link = split(
    ({query}) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
);//subscription인지 판별 후 wsLink와 httplink로 분기처리

const client = new ApolloClient({
    link: from ([authLink, link]),
    cache: new InMemoryCache()
});

export default client;