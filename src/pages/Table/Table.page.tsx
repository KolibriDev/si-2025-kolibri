'use client'

import * as T from '@/components/Table/Table'
import { Box } from '@/components/Box/Box'
import * as G from '@/components/Grid'
import { Button } from '@/components/Button/Button'
import { Text } from '@/components/Text/Text'
import AnimateHeight from 'react-animate-height'

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

type morage = {
  lender: string
  number: string
  interestExpenses: number
  remainingDebt: number
}
function TableExpand({ subtable }: { subtable: React.ReactNode }) {
  const morage: morage = {
    lender: 'Íslandsbanki hf.',
    number: '56783900123',
    interestExpenses: 920_000,
    remainingDebt: 28_540_000,
  }

  const [expanded, toogleExpanded] = useState<boolean>(false)

  return (
    <Box>
      <T.Table>
        <T.Head>
          <T.Row>
            <T.HeadData>{/* empty for expand button */}</T.HeadData>
            <T.HeadData>{'Lánveitandi'}</T.HeadData>
            <T.HeadData>{'Lánsnúmer'}</T.HeadData>
            <T.HeadData align="right">{'Vaxtagjöld'}</T.HeadData>
            <T.HeadData align="right">{'Eftirstöðvar skulda'}</T.HeadData>
          </T.Row>
        </T.Head>
        <T.Body>
          <T.Row>
            <T.Data>
              <Button
                circle
                title="Expand"
                type="light"
                icon={expanded ? 'remove' : 'add'}
                onClick={() => toogleExpanded((prev) => !prev)}
              />
            </T.Data>
            <T.Data>{morage.lender}</T.Data>
            <T.Data>{morage.number}</T.Data>
            <T.Data align="right">{formatISK(morage.interestExpenses)}</T.Data>
            <T.Data align="right">{formatISK(morage.remainingDebt)}</T.Data>
          </T.Row>
          <T.Row>
            <T.Data
              colSpan={5}
              borderColor="transparent"
              style={{ padding: 0 }}
            >
              <AnimateHeight duration={300} height={expanded ? 'auto' : 0}>
                {subtable}
              </AnimateHeight>
            </T.Data>
          </T.Row>
        </T.Body>
        <T.Foot>
          <T.Row>
            <T.Data text={{ fontWeight: 'bold' }}>Samtals</T.Data>
            <T.Data>{/* empty for lanveitandi */}</T.Data>
            <T.Data>{/* empty  for lansnumber */}</T.Data>
            <T.Data text={{ fontWeight: 'bold' }} align="right">
              {formatISK(morage.interestExpenses)}
            </T.Data>
            <T.Data text={{ fontWeight: 'bold' }} align="right">
              {formatISK(morage.remainingDebt)}
            </T.Data>
          </T.Row>
        </T.Foot>
      </T.Table>
    </Box>
  )
}

export default function TablePage() {
  return (
    <Box style={{ maxWidth: '1000px', margin: 'auto', marginTop: '24px' }}>
      <h2>Table expand</h2>
      <TableExpand subtable={<Text>{'Todo'}</Text>} />
    </Box>
  )
}
