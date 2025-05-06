import { createYoga, createSchema } from 'graphql-yoga'
import { resolvers } from './schema/resolvers'
import { typeDefs } from './schema/typeDefs'

const { handleRequest } = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response },
})

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }
