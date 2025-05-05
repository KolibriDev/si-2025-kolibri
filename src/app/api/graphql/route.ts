// Next.js Custom Route Handler: https://nextjs.org/docs/app/building-your-application/routing/router-handlers
import { createSchema, createYoga } from "graphql-yoga";

interface NextContext {
  params: Promise<Record<string, string>>;
}

const { handleRequest } = createYoga<NextContext>({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        greetings: String
      }
    `,
    resolvers: {
      Query: {
        async greetings(): Promise<string> {
          const res = await fetch(
            `${process.env.INTERNAL_API_BASE_URL}/api/internal/tax-authority`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-internal-secret": process.env.INTERNAL_API_SECRET ?? "",
              },
            }
          );
          const data = await res.json();

          const nationalRegistryResponse = await fetch(
            `${process.env.INTERNAL_API_BASE_URL}/api/internal/national-registry`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-internal-secret": process.env.INTERNAL_API_SECRET ?? "",
              },
            }
          );

          const data2 = await nationalRegistryResponse.json();

          return `GraphQL got: ${data.message} ${data2.message}`;
        },
      },
    },
  }),

  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: "/api/graphql",

  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
});

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
