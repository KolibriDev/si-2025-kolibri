// app/api/graphql/schema/resolvers/query.ts
import { getTaxReturnByNationalId } from '@/app/api/graphql/db/taxReturn'
import { fetchIndividualByPhone } from '@/app/api/graphql/services/nationalRegistry'
import { TaxReturn, NationalRegistry } from '@/lib/application'
import {
  fetchSubmittedTaxReturnByNationalId,
  fetchTaxPrefillByNationalId,
} from '../../services/taxAuthority'

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

    return taxReturnPrefill as TaxReturn
  },

  async individual(
    _: unknown,
    args: { phoneNumber: string },
  ): Promise<NationalRegistry | null> {
    return await fetchIndividualByPhone(args.phoneNumber)
  },

  async submittedTaxReturn(
    _: unknown,
    args: { nationalId: string },
  ): Promise<TaxReturn | null> {
    const submittedTaxReturn = await fetchSubmittedTaxReturnByNationalId(
      args.nationalId,
    )
    return submittedTaxReturn as TaxReturn
  },
}
