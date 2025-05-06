import { NextRequest } from 'next/server'
import { z } from 'zod'
import postgres from 'postgres'

export const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

export const idQuerySchema = z.object({
  id: z.string(),
})

export const nationalIdQuerySchema = z.object({
  national_id: z.string(),
})

export const nationalRegistrySchema = z.object({
  national_id: z.string().length(10),
  name: z.string(),
})

export const taxpayerSchema = z.object({
  national_id: z.string(),
  email: z.string().email(),
})

export const updateTaxpayerSchema = z.object({
  national_id: z.string(),
  email: z.string().email(),
})

export const taxReturnSchema = z.object({
  id: z.string(),
  national_id: z.string().length(10),
  name: z.string(),
  address: z.string(),
  email: z.string().email(),
  phone_number: z.string(),
  has_accident_insurance: z.boolean(),
  bank_account: z.string().length(12),
})

export const createAndUpdateTaxReturnSchema = z.object({
  national_id: z.string().length(10),
  name: z.string(),
  address: z.string(),
  email: z.string().email(),
  phone_number: z.string(),
  has_accident_insurance: z.boolean(),
  bank_account: z.string().length(12),
})

export const salarySchema = z.object({
  id: z.string(),
  tax_return_id: z.string(),
  employer_national_id: z.string().length(10),
  employer_name: z.string(),
  amount: z.number(),
})

export const createSalarySchema = z.object({
  tax_return_id: z.string(),
  employer_national_id: z.string().length(10),
  employer_name: z.string(),
  amount: z.number(),
})

export const updateSalarySchema = z.object({
  id: z.string(),
  tax_return_id: z.string(),
  employer_national_id: z.string().length(10),
  employer_name: z.string(),
  amount: z.number(),
})

export function validateSecret(req: NextRequest): boolean {
  const secret = req.headers.get('x-internal-secret')
  return secret === process.env.INTERNAL_API_SECRET
}
