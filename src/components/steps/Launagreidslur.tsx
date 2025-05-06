'use client'

import React, { useState } from 'react'
import { Text } from '@/components/Text/Text'
import { Box } from '@/components/Box/Box'
import * as T from '@/components/Table/Table'
import { Button } from '@/components/Button/Button'
import { formatISK } from '@/lib/utils'

type vehicle = {
  licenceNumber: string
  yearPurchesed: string
  price: number
}

const Launagreidslur = () => {
  const [vehicles, setVehicles] = useState<vehicle[]>([
    {
      licenceNumber: 'KB-521',
      yearPurchesed: '2021',
      price: 3_100_000,
    },
    {
      licenceNumber: 'JU-329',
      yearPurchesed: '2012',
      price: 430_000,
    },
  ])

  const onClick = () => {
    setVehicles((prev) => [
      ...prev,
      { licenceNumber: 'VY-V79', yearPurchesed: '2018', price: 1_200_000 },
    ])
  }

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
            {vehicles.map((v) => (
              <T.Row key={v.licenceNumber}>
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
                <T.Data>{v.licenceNumber}</T.Data>
                <T.Data>{v.yearPurchesed}</T.Data>
                <T.Data align="right">{formatISK(v.price)}</T.Data>
              </T.Row>
            ))}
          </T.Body>
          <T.Foot>
            <T.Row>
              <T.Data text={{ fontWeight: 'bold' }}>Samtals:</T.Data>
              <T.Data>{/* empty */}</T.Data>
              <T.Data>{/* empty */}</T.Data>
              <T.Data text={{ fontWeight: 'bold' }} align="right">
                {formatISK(vehicles.reduce((v, a) => v + a.price, 0))}
              </T.Data>
            </T.Row>
          </T.Foot>
        </T.Table>
      </Box>

      <Button variant="ghost" size="small" onClick={onClick}>
        Add +
      </Button>
    </div>
  )
}

export default Launagreidslur
