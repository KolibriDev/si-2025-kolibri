// Next.js Custom Route Handler: https://nextjs.org/docs/app/building-your-application/routing/router-handlers
import { createSchema, createYoga } from 'graphql-yoga'

interface NextContext {
  params: Promise<Record<string, string>>
}

const { handleRequest } = createYoga<NextContext>({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        """
        Greets the user
        """
        greetings(national_id: String!): String
      }

      type Mutation {
        """
        Says hi to the name
        """
        sayHi(name: String!): String
      }
    `,
    resolvers: {
      Query: {
        async greetings(
          _: unknown,
          args: { national_id: string },
        ): Promise<string> {
          const res = await fetch(
            `${process.env.INTERNAL_API_BASE_URL}/api/internal/tax-authority/tax-payer/${args.national_id}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'x-internal-secret': process.env.INTERNAL_API_SECRET ?? '',
              },
            },
          )
          const data = await res.json()
          console.log('GraphQL data:', data)

          const nationalRegistryResponse = await fetch(
            `${process.env.INTERNAL_API_BASE_URL}/api/internal/national-registry/?national_id=${args.national_id}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'x-internal-secret': process.env.INTERNAL_API_SECRET ?? '',
              },
            },
          )

          const data2 = await nationalRegistryResponse.json()

          return `GraphQL got:  ${data2[0].name}: ${data.email}`
        },
      },
      Mutation: {
        sayHi: (_: unknown, args: { name: string }): string => {
          return `Hi: ${args.name}`
        },
      },
    },
  }),

  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: '/api/graphql',

  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
})

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }
