import { sql } from '@/lib/apiHelper'
import { TaxReturn } from '@/lib/application'

export async function insertTaxReturn(
  nationalId: string,
  taxReturn: TaxReturn,
): Promise<void> {
  const serialized = JSON.parse(JSON.stringify(taxReturn))

  await sql`
      INSERT INTO application_tax_return (national_id, tax_return_info)
      VALUES (${nationalId}, ${sql.json(serialized)})
    `
}
