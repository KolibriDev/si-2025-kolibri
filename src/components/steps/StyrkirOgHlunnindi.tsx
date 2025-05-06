'use client'

import React from 'react'
import { Text } from '@/components/Text/Text'
import { useTaxContext } from '../Utils/context/taxContext'
import { Box } from '../Box/Box'
import * as T from '@/components/Table/Table'
import { Button } from '../Button/Button'

const StyrkirOgHlunnindi = () => {
  const { taxReturn } = useTaxContext()

  const benefits = taxReturn?.benefits

  return (
    <div>
      <Text marginBottom={2}>
        Allir styrkir og starfstengd hlunnindi sem þú hefur fengið greidd koma
        fram hér. Dæmi um þetta eru greiðslur frá vinnuveitendum, styrkir í
        gegnum stéttarfélög og náms- og vísindastyrkir.
      </Text>
      <Text marginBottom={6}>
        Ef þú fékkst greiddan styrk sem ekki kemur fram hér fyrir neðan þarftu
        að skrá hann til að framtalið sé rétt.
      </Text>
      {benefits && (
        <>
          <Box marginBottom={3}>
            <T.Table>
              <T.Head>
                <T.Row>
                  <T.HeadData>{/* empty */}</T.HeadData>
                  <T.HeadData>{'Launagreiðandi'}</T.HeadData>
                  <T.HeadData>{'Kennitala'}</T.HeadData>
                  <T.HeadData align="right">{'Launafjárhæð'}</T.HeadData>
                </T.Row>
              </T.Head>
              <T.Body>
                {benefits.map((benefit) => (
                  <T.Row key={benefit.payerName}>
                    <T.Data>
                      <Button
                        circle
                        colorScheme="negative"
                        title="Expand"
                        type="icon"
                        icon={'pencil'}
                        onClick={() => {}}
                      />
                    </T.Data>
                    <T.Data>{'TODO'}</T.Data>
                    <T.Data>{benefit.amount}</T.Data>
                    <T.Data align="right">{'sdf'}</T.Data>
                  </T.Row>
                ))}
              </T.Body>
              <T.Foot>
                <T.Row>
                  <T.Data text={{ fontWeight: 'bold' }}>Samtals:</T.Data>
                  <T.Data>{/* empty */}</T.Data>
                  <T.Data>{/* empty */}</T.Data>
                  <T.Data text={{ fontWeight: 'bold' }} align="right">
                    {/* {formatISK(vehicles.reduce((v, a) => v + a.price, 0))} */}
                  </T.Data>
                </T.Row>
              </T.Foot>
            </T.Table>
          </Box>
          <Button variant="ghost" size="small" onClick={() => {}}>
            Add +
          </Button>
        </>
      )}
    </div>
  )
}

export default StyrkirOgHlunnindi
