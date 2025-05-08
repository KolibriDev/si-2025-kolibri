'use client'

import React from 'react'
import { Text } from '@/components/Text/Text'
import { Box } from '@/components/Box/Box'
import * as T from '@/components/Table/Table'
import { Button } from '@/components/Button/Button'
import { formatISK, formatNationalId } from '@/lib/utils'
import { useTaxContext } from '../Utils/context/taxContext'
import { SalaryInput } from '@/generated/graphql'
import { Icon } from '../IconRC/Icon'
import LoadingDots from '../LoadingDots/LoadingDots'

export const SalaryEntries = ({
  salaryEntries,
  isEditable = false,
}: {
  salaryEntries: SalaryInput[]

  isEditable?: boolean
}) => {
  return (
    <>
      <Box marginBottom={3}>
        <T.Table>
          <T.Head>
            <T.Row>
              {isEditable && <T.HeadData>{/* empty */}</T.HeadData>}
              <T.HeadData>{'Launagreiðandi'}</T.HeadData>
              <T.HeadData>{'Kennitala'}</T.HeadData>
              <T.HeadData align="right">{'Launafjárhæð'}</T.HeadData>
            </T.Row>
          </T.Head>
          <T.Body>
            {salaryEntries.map((salaryEntry) => (
              <T.Row key={salaryEntry.employerName}>
                {isEditable && (
                  <T.Data>
                    <Button
                      circle
                      colorScheme="negative"
                      title="Expand"
                      type="icon"
                      icon={'pencil'}
                      size="small"
                      onClick={() => {}}
                    />
                  </T.Data>
                )}
                <T.Data>{salaryEntry.employerName}</T.Data>
                <T.Data>
                  {formatNationalId(salaryEntry.employerNationalId)}
                </T.Data>
                <T.Data align="right" text={{ whiteSpace: 'nowrap' }}>
                  {formatISK(salaryEntry.amount)}
                </T.Data>
              </T.Row>
            ))}
          </T.Body>
          <T.Foot>
            <T.Row>
              <T.Data text={{ fontWeight: 'bold' }} noBorderBottom>
                Samtals:
              </T.Data>
              {isEditable && <T.Data noBorderBottom>{/* empty */}</T.Data>}
              <T.Data noBorderBottom>{/* empty */}</T.Data>
              <T.Data
                text={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}
                align="right"
                noBorderBottom
              >
                {formatISK(
                  // TODO: FIX ! below
                  salaryEntries.reduce((v, a) => v + a.amount! || 0, 0),
                )}
              </T.Data>
            </T.Row>
          </T.Foot>
        </T.Table>
      </Box>
    </>
  )
}

const Launagreidslur = () => {
  const { taxReturn } = useTaxContext()

  const salaryEntries = taxReturn?.salaries

  return (
    <div>
      <Text marginBottom={2}>
        Hér eru forskráðar allar launa- og verktakagreiðslur sem þú fékkst á
        síðasta ári. Gögnin eru byggð á því sem launagreiðendur þínir skiluðu
        inn til Skattsins.
      </Text>
      <Text marginBottom={6}>
        Ef þú fékkst fleiri launa- eða verktakagreiðslur á árinu þarftu að skrá
        þær til að framtalið sé rétt.
      </Text>
      {taxReturn ? (
        <SalaryEntries salaryEntries={salaryEntries ?? []} isEditable={true} />
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ height: '277px' }}
        >
          <LoadingDots />
        </Box>
      )}
      <Button variant="ghost" size="small" onClick={() => {}}>
        <Box display="flex" columnGap={1} alignItems="center">
          <Text variant="h5" fontWeight="semiBold" color="blue400">
            Bæta við
          </Text>
          <Icon icon="add" size="small" />
        </Box>
      </Button>
    </div>
  )
}

export default Launagreidslur
