import { createYoga, createSchema } from 'graphql-yoga'
import { resolvers } from './schema/resolvers'
import { typeDefs } from './schema/typeDefs'

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response },
})

// Wrap the handler to ensure compatibility
const handler = async (req: Request) => {
  return yoga.handleRequest(req, {})
}

export { handler as GET, handler as POST, handler as OPTIONS }
