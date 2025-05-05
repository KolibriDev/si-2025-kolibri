import { route, routeOperation, TypedNextResponse } from 'next-rest-framework'
import { z } from 'zod'
import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

const nationalRegistrySchema = z.object({
  national_id: z.string(),
  name: z.string(),
})

export const { GET } = route({
  getNationalRegistry: routeOperation({
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
        body: z.array(nationalRegistrySchema),
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
    .handler(async (req, ctx, params) => {
      const url = new URL(req.url)
      const nationalId = url.searchParams.get('nationalId')
      console.log('Received request:', nationalId)
      try {
        type NationalRegistryEntry = z.infer<typeof nationalRegistrySchema>

        const data = await sql<NationalRegistryEntry[]>`
          SELECT *
          FROM national_registry
          WHERE national_id = ${nationalId};
        `

        return TypedNextResponse.json(data, { status: 200 })
      } catch (error) {
        console.error('Database error:', error)
        return TypedNextResponse.json(
          { error: 'Internal Server Error' },
          { status: 500 },
        )
      }
    }),
})
