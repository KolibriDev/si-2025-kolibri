import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: '/api/graphql', // relative to domain (same-origin)
  cache: new InMemoryCache(),
})

export default client
