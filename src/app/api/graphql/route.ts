// app/api/graphql/route.ts
import { createYoga, createSchema } from 'graphql-yoga'
import {
  createTaxReturn,
  getTaxReturnByNationalId,
  updateTaxReturn,
} from '@/app/api/graphql/db/taxReturn'
import { TaxReturn, NationalRegistry } from '@/lib/application'

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

      type NationalRegistry {
        nationalId: String!
        name: String
        phoneNumber: String
      }

      type Query {
        taxReturn(nationalId: String!): TaxReturn
        individual(phoneNumber: String!): NationalRegistry
      }

      type Mutation {
        sayHi(name: String!): String
        createTaxReturn(nationalId: String!): TaxReturn
        updateTaxReturn(nationalId: String!): TaxReturn
      }
    `,
    resolvers: {
      Query: {
        async taxReturn(
          _: unknown,
          args: { nationalId: string },
        ): Promise<TaxReturn | null> {
          return await getTaxReturnByNationalId(args.nationalId)
        },

        async individual(
          _: unknown,
          args: { phoneNumber: string },
        ): Promise<NationalRegistry | null> {
          const res = await fetch(
            `${process.env.INTERNAL_API_BASE_URL}/api/internal/national-registry/?phoneNumber=${args.phoneNumber}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'x-internal-secret': process.env.INTERNAL_API_SECRET ?? '',
              },
            },
          )
          const nationalRegistry = await res.json()
          if (nationalRegistry.length === 0) {
            return null
          }
          return nationalRegistry[0] as NationalRegistry
        },
      },
      Mutation: {
        sayHi: (_: unknown, args: { name: string }): string => {
          return `Hi: ${args.name}`
        },

        async createTaxReturn(
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
            name: nationalRegistry[0]?.name,
          }

          await createTaxReturn(args.nationalId, taxReturn)

          return taxReturn
        },

        async updateTaxReturn(
          _: unknown,
          args: { nationalId: string },
        ): Promise<TaxReturn> {
          const existing = await getTaxReturnByNationalId(args.nationalId)
          if (!existing) {
            throw new Error('Tax return not found.')
          }

          // You can apply business logic here to update fields
          const updated: TaxReturn = {
            ...existing,
            name: existing.name, // example – keep name the same
            // potentially modify or merge other fields
          }

          await updateTaxReturn(args.nationalId, updated)

          return updated
        },
      },
    },
  }),

  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response },
})

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }
