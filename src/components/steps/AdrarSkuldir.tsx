'use client'

import React from 'react'
import { Text } from '@/components/Text/Text'
import { useTaxContext } from '../Utils/context/taxContext'
import { Box } from '../Box/Box'
import * as T from '@/components/Table/Table'
import { Button } from '../Button/Button'
import { formatISK } from '@/lib/utils'
import { OtherDebt } from '@/generated/graphql'
import { Icon } from '../IconRC/Icon'

export const OtherDebts = ({
  otherDebts,
  isEditable,
}: {
  otherDebts: OtherDebt[]
  isEditable?: boolean
}) => {
  return (
    <Box marginBottom={3}>
      <T.Table>
        <T.Head>
          <T.Row>
            {isEditable && <T.HeadData>{/* empty */}</T.HeadData>}
            <T.HeadData>{'Nafn lánveitanda'}</T.HeadData>
            <T.HeadData>{'Vaxtagjöld'}</T.HeadData>
            <T.HeadData align="right">{'Eftirstöðvar skulda'}</T.HeadData>
          </T.Row>
        </T.Head>
        <T.Body>
          {otherDebts.map((otherDept) => (
            <T.Row key={otherDept.lenderName}>
              {isEditable && (
                <T.Data>
                  <Button
                    circle
                    colorScheme="negative"
                    title="Breyta"
                    type="icon"
                    icon={'pencil'}
                    onClick={() => {}}
                  />
                </T.Data>
              )}
              <T.Data>{otherDept.lenderName}</T.Data>
              <T.Data align="right">
                {formatISK(otherDept.interestPayments)}
              </T.Data>
              <T.Data align="right">
                {formatISK(otherDept.remainingBalance)}
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
            <T.Data
              text={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}
              noBorderBottom
            >
              {formatISK(
                // TODO: FIX ! below
                otherDebts.reduce((v, a) => v + a.interestPayments! || 0, 0),
              )}
            </T.Data>
            <T.Data
              text={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}
              align="right"
              noBorderBottom
            >
              {formatISK(
                // TODO: FIX ! below
                otherDebts.reduce((v, a) => v + a.remainingBalance! || 0, 0),
              )}
            </T.Data>
          </T.Row>
        </T.Foot>
      </T.Table>
    </Box>
  )
}

const AdrarSkuldir = () => {
  const { taxReturn } = useTaxContext()
  const otherDepts = taxReturn?.otherDebts

  return (
    <div>
      <Text marginBottom={2}>
        Allar aðrar skuldir eiga að koma fram hér. Dæmi um aðrar skuldir eru
        námslán, bankalán, eftirstöðvar á kreditkortum og skuldir við Skattinn.
      </Text>
      <Text marginBottom={6}>
        Ef þú skuldar öðrum lánveitendum en það sem fram kemur hér þarftu að
        bæta skuldinni við til að framtalið sé rétt.
      </Text>
      <OtherDebts otherDebts={otherDepts ?? []} isEditable />
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

export default AdrarSkuldir
