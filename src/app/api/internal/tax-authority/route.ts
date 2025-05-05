import { route, routeOperation, TypedNextResponse } from 'next-rest-framework'
import { z } from 'zod'
import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

const taxpayerSchema = z.object({
  national_id: z.string(),
  email: z.string(),
})

export const { GET } = route({
  getTaxPayer: routeOperation({
    method: 'GET',
  })
    .input({
      query: z.object({
        nationalId: z.string(),
      }),
    })
    .outputs([
      {
        status: 200,
        contentType: 'application/json',
        body: z.array(taxpayerSchema),
      },
      {
        status: 400,
        contentType: 'application/json',
        body: z.object({ error: z.string() }),
      },
      {
        status: 401,
        contentType: 'application/json',
        body: z.object({ error: z.string() }),
      },
      {
        status: 500,
        contentType: 'application/json',
        body: z.object({ error: z.string() }),
      },
    ])
    .middleware(async (req) => {
      const secret = req.headers.get('x-internal-secret')
      if (secret !== process.env.INTERNAL_API_SECRET) {
        return TypedNextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 },
        )
      }
    })
    .handler(async (req) => {
      const url = new URL(req.url)
      const nationalId = url.searchParams.get('nationalId')
      console.log('Received request:', nationalId)

      if (!nationalId) {
        return TypedNextResponse.json(
          { error: 'Missing nationalId' },
          { status: 400 },
        )
      }

      try {
        type TaxPayer = z.infer<typeof taxpayerSchema>

        const data = await sql<TaxPayer[]>`
          SELECT national_id, email
          FROM tax_authority_tax_payers
          WHERE national_id = ${nationalId};
        `
        return TypedNextResponse.json(data, { status: 200 })
      } catch (error) {
        console.error('Error fetching data:', error)
        return TypedNextResponse.json(
          { error: 'Internal Server Error' },
          { status: 500 },
        )
      }
    }),
})
