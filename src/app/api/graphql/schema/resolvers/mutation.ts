import {
  createTaxReturn as dbCreate,
  getTaxReturnByNationalId,
  updateTaxReturn as dbUpdate,
} from '@/app/api/graphql/db/taxReturn'
import {
  fetchTaxPayerByNationalId,
  fetchTaxPrefillByNationalId,
} from '@/app/api/graphql/services/taxAuthority'
import { fetchIndividualByNationalId } from '@/app/api/graphql/services/nationalRegistry'
import { TaxReturn } from '@/lib/application'

export const Mutation = {
  sayHi: (_: unknown, args: { name: string }): string => {
    return `Hi: ${args.name}`
  },

  async createTaxReturn(
    _: unknown,
    args: { nationalId: string },
  ): Promise<TaxReturn> {
    const existing = await getTaxReturnByNationalId(args.nationalId)
    if (existing) return existing

    const taxPayer = await fetchTaxPayerByNationalId(args.nationalId)

    const taxRegistryPrefill = await fetchTaxPrefillByNationalId(
      args.nationalId,
    )

    const registry = await fetchIndividualByNationalId(args.nationalId)
    const prefill = taxRegistryPrefill as TaxReturn

    console.log('Tax registry prefill:', taxRegistryPrefill)
    console.log('Tax payer:', taxPayer)
    console.log('Registry:', registry)

    const taxReturn: TaxReturn = {
      email: prefill.email ?? taxPayer?.email,
      name: registry?.name,
      address: prefill?.address ?? registry?.address,
      phoneNumber: prefill?.phoneNumber ?? registry?.phone_number,
      nationalId: prefill?.nationalId,
      bankAccount: prefill?.bankAccount,
      salaries: prefill?.salaries,
      benefits: prefill?.benefits,
      deductions: prefill?.deductions,
      realEstates: prefill?.realEstates,
      vehicles: prefill?.vehicles,
      mortgages: prefill?.mortgages,
      otherDebts: prefill?.otherDebts,
    }

    await dbCreate(args.nationalId, taxReturn)

    return taxReturn
  },

  async updateTaxReturn(
    _: unknown,
    args: { nationalId: string; input: Partial<TaxReturn> },
  ): Promise<TaxReturn> {
    const existing = await getTaxReturnByNationalId(args.nationalId)
    if (!existing) throw new Error('Tax return not found.')

    const updated: TaxReturn = {
      ...existing,
      ...args.input,
    }

    await dbUpdate(args.nationalId, updated)
    return updated
  },
}
