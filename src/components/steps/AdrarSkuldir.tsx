'use client'

import React from 'react'
import { Text } from '@/components/Text/Text'
import { useTaxContext } from '../Utils/context/taxContext'
import { Box } from '../Box/Box'
import * as T from '@/components/Table/Table'
import { Button } from '../Button/Button'
import { formatISK } from '@/lib/utils'

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
      {otherDepts && (
        <>
          <Box marginBottom={3}>
            <T.Table>
              <T.Head>
                <T.Row>
                  <T.HeadData>{/* empty */}</T.HeadData>
                  <T.HeadData>{'Nafn lánveitanda'}</T.HeadData>
                  <T.HeadData>{'Kennitala lánveitanda'}</T.HeadData>
                  <T.HeadData>{'Vaxtagjöld'}</T.HeadData>
                  <T.HeadData align="right">{'Eftirstöðvar skulda'}</T.HeadData>
                </T.Row>
              </T.Head>
              <T.Body>
                {otherDepts.map((otherDept) => (
                  <T.Row key={otherDept.lenderName}>
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
                    <T.Data>{otherDept.lenderName}</T.Data>
                    <T.Data>{otherDept.lenderNationalId}</T.Data>
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
                  <T.Data text={{ fontWeight: 'bold' }}>Samtals:</T.Data>
                  <T.Data>{/* empty */}</T.Data>
                  <T.Data>{/* empty */}</T.Data>
                  <T.Data text={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                    {formatISK(
                      // TODO: FIX ! below
                      otherDepts.reduce(
                        (v, a) => v + a.interestPayments! || 0,
                        0,
                      ),
                    )}
                  </T.Data>
                  <T.Data
                    text={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}
                    align="right"
                  >
                    {formatISK(
                      // TODO: FIX ! below
                      otherDepts.reduce(
                        (v, a) => v + a.remainingBalance! || 0,
                        0,
                      ),
                    )}
                  </T.Data>
                </T.Row>
              </T.Foot>
            </T.Table>
          </Box>
          <Button variant="ghost" size="small" icon="add" onClick={() => {}}>
            Bæta við
          </Button>
        </>
      )}
    </div>
  )
}

export default AdrarSkuldir
