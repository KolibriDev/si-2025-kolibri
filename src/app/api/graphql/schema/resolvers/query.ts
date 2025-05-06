// app/api/graphql/schema/resolvers/query.ts
import { getTaxReturnByNationalId } from '@/app/api/graphql/db/taxReturn'
import { fetchIndividualByPhone } from '@/app/api/graphql/services/nationalRegistry'
import { TaxReturn, NationalRegistry } from '@/lib/application'

export const Query = {
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
    return await fetchIndividualByPhone(args.phoneNumber)
  },
}
