import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.graphcms.com/v2/cl4o6qaal0v6e01xi02h01xih/master',
  cache: new InMemoryCache()
})