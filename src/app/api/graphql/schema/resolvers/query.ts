// app/api/graphql/schema/resolvers/query.ts
import { getTaxReturnByNationalId } from '@/app/api/graphql/db/taxReturn'
import { fetchIndividualByPhone } from '@/app/api/graphql/services/nationalRegistry'
import { TaxReturn, NationalRegistry } from '@/lib/application'
import { fetchTaxPrefillByNationalId } from '../../services/taxAuthority'

export const Query = {
  async taxReturn(
    _: unknown,
    args: { nationalId: string },
  ): Promise<TaxReturn | null> {
    return await getTaxReturnByNationalId(args.nationalId)
  },

  async taxReturnPrefill(
    _: unknown,
    args: { nationalId: string },
  ): Promise<TaxReturn | null> {
    const taxReturnPrefill = await fetchTaxPrefillByNationalId(args.nationalId)

    console.log('taxReturnPrefill', taxReturnPrefill)
    if (!taxReturnPrefill) return null
    const taxReturn: TaxReturn = {
      nationalId: args.nationalId,
      email: taxReturnPrefill.email,
      name: taxReturnPrefill.name,
      phoneNumber: taxReturnPrefill.phoneNumber,
    }

    return taxReturn
  },

  async individual(
    _: unknown,
    args: { phoneNumber: string },
  ): Promise<NationalRegistry | null> {
    return await fetchIndividualByPhone(args.phoneNumber)
  },
}
