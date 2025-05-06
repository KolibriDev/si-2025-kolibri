'use client'

import * as T from '@/components/Table/Table'
import { Box } from '@/components/Box/Box'
import { Button } from '@/components/Button/Button'

import { formatISK } from '@/lib/utils'
import { useState } from 'react'

type vehicle = {
  licenceNumber: string
  yearPurchesed: string
  price: number
}

function TableBasic() {
  const vehicles: vehicle[] = [
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
  ]

  return (
    <T.Table>
      <T.Head>
        <T.Row>
          <T.HeadData>{'Bílnúmer'}</T.HeadData>
          <T.HeadData>{'Kaupár'}</T.HeadData>
          <T.HeadData align="right">{'Kaupverð'}</T.HeadData>
        </T.Row>
      </T.Head>
      <T.Body>
        {vehicles.map((v) => (
          <T.Row key={v.licenceNumber}>
            <T.Data>{v.licenceNumber}</T.Data>
            <T.Data>{v.yearPurchesed}</T.Data>
            <T.Data align="right">{formatISK(v.price)}</T.Data>
          </T.Row>
        ))}
      </T.Body>
      <T.Foot>
        <T.Row>
          <T.Data text={{ fontWeight: 'bold' }}>Samtals</T.Data>
          <T.Data>{/* empty */}</T.Data>
          <T.Data text={{ fontWeight: 'bold' }} align="right">
            {formatISK(3_530_000)}
          </T.Data>
        </T.Row>
      </T.Foot>
    </T.Table>
  )
}

function TableAdd() {
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
    <Box>
      <T.Table>
        <T.Head>
          <T.Row>
            <T.HeadData>{'Bílnúmer'}</T.HeadData>
            <T.HeadData>{'Kaupár'}</T.HeadData>
            <T.HeadData align="right">{'Kaupverð'}</T.HeadData>
          </T.Row>
        </T.Head>
        <T.Body>
          {vehicles.map((v) => (
            <T.Row key={v.licenceNumber}>
              <T.Data>{v.licenceNumber}</T.Data>
              <T.Data>{v.yearPurchesed}</T.Data>
              <T.Data align="right">{formatISK(v.price)}</T.Data>
            </T.Row>
          ))}
        </T.Body>
        <T.Foot>
          <T.Row>
            <T.Data text={{ fontWeight: 'bold' }}>Samtals</T.Data>
            <T.Data>{/* empty */}</T.Data>
            <T.Data text={{ fontWeight: 'bold' }} align="right">
              {formatISK(vehicles.reduce((v, a) => v + a.price, 0))}
            </T.Data>
          </T.Row>
        </T.Foot>
      </T.Table>

      <Button variant="ghost" size="small" onClick={onClick}>
        Add +
      </Button>
    </Box>
  )
}

export default function TablePage() {
  return (
    <Box style={{ maxWidth: '1000px', margin: 'auto', marginTop: '24px' }}>
      <h2>Table basic</h2>
      <TableBasic />
      <h2>Table add</h2>
      <TableAdd />
    </Box>
  )
}
