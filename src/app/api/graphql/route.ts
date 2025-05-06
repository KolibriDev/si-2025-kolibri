// Next.js Custom Route Handler: https://nextjs.org/docs/app/building-your-application/routing/router-handlers
import { TaxReturn } from '@/lib/application'
import { insertTaxReturn } from '@/app/api/graphql/db/insertTaxReturn'
import { createSchema, createYoga } from 'graphql-yoga'

interface NextContext {
  params: Promise<Record<string, string>>
}

const { handleRequest } = createYoga<NextContext>({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      enum DeductionType {
        OTHER
      }

      type Salary {
        employerNationalId: String
        employerName: String
        amount: Float
      }

      type Benefit {
        payerNationalId: String
        payerName: String
        amount: Float
      }

      type Deduction {
        deductionType: DeductionType
        amount: Float
      }

      type RealEstate {
        number: String
        address: String
        appraisal: Float
      }

      type Vehicle {
        registrationNumber: String
        yearOfPurchase: Int
        purchasePrice: Float
      }

      type Mortgage {
        realEstateNumber: String
        lenderNationalId: String
        lenderName: String
        loanNumber: String
        loanStartDate: String
        loanAmount: Float
        loanTermYears: Int
        totalAnnualPayments: Float
        principalPayments: Float
        interestPayments: Float
        remainingBalance: Float
      }

      type TaxReturn {
        nationalId: String!
        name: String
        address: String
        email: String
        phoneNumber: String
        hasAccidentInsurance: Boolean
        bankAccount: String
        salaries: [Salary!]
        benefits: [Benefit!]
        deductions: [Deduction!]
        realEstates: [RealEstate!]
        vehicles: [Vehicle!]
        mortgages: [Mortgage!]
      }

      type Query {
        taxReturn(nationalId: String!): TaxReturn
      }

      type Mutation {
        sayHi(name: String!): String
      }
    `,
    resolvers: {
      Query: {
        async taxReturn(
          _: unknown,
          args: { nationalId: string },
        ): Promise<TaxReturn> {
          const res = await fetch(
            `${process.env.INTERNAL_API_BASE_URL}/api/internal/tax-authority/tax-payer/${args.nationalId}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'x-internal-secret': process.env.INTERNAL_API_SECRET ?? '',
              },
            },
          )
          const taxPayer = await res.json()

          const nationalRegistryResponse = await fetch(
            `${process.env.INTERNAL_API_BASE_URL}/api/internal/national-registry/?nationalId=${args.nationalId}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'x-internal-secret': process.env.INTERNAL_API_SECRET ?? '',
              },
            },
          )

          const nationalRegistry = await nationalRegistryResponse.json()

          const taxReturn: TaxReturn = {
            nationalId: args.nationalId,
            email: taxPayer.email,
            name: nationalRegistry[0].name,
          }

          await insertTaxReturn(args.nationalId, taxReturn)

          console.log('Saving tax return to DB:', taxReturn)
          return taxReturn
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
