import { sql } from '@/lib/apiHelper'
import { TaxReturn } from '@/lib/application'

export async function createTaxReturn(
  nationalId: string,
  taxReturn: TaxReturn,
): Promise<void> {
  const serialized = JSON.parse(JSON.stringify(taxReturn))

  await sql`
      INSERT INTO application_tax_return (national_id, tax_return_info)
      VALUES (${nationalId}, ${sql.json(serialized)})
    `
}

export async function getTaxReturnByNationalId(
  nationalId: string,
): Promise<TaxReturn | null> {
  const result = await sql`
    SELECT tax_return_info
    FROM application_tax_return
    WHERE national_id = ${nationalId}
  `

  if (result.length === 0) return null

  return result[0].tax_return_info as TaxReturn
}

export async function updateTaxReturn(
  nationalId: string,
  taxReturn: TaxReturn,
): Promise<void> {
  const serialized = JSON.parse(JSON.stringify(taxReturn))

  await sql`
    UPDATE application_tax_return
    SET tax_return_info = ${sql.json(serialized)}
    WHERE national_id = ${nationalId}
  `
}
