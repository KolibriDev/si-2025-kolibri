'use client'

import React, { useEffect } from 'react'
import { Text } from '@/components/Text/Text'
import * as T from '@/components/Table/Table'
import { useTaxContext } from '../Utils/context/taxContext'
import { formatISK } from '@/lib/utils'
import { Stack } from '../Stack/Stack'
import { Box } from '../Box/Box'
import { Button } from '../Button/Button'

const Eignir = () => {
  const { taxReturn } = useTaxContext()
  if (!taxReturn) {
    return <Text>Vantar gögn</Text>
  }
  return (
    <div>
      <Text marginBottom={6}>
        Eftirfarandi eignir voru skráðar á þig um síðustu áramót samkvæmt
        upplýsingum frá Skattinum. Ef eign vantar eða þú hefur selt einhverja af
        neðangreindum eignum, þarftu að skrá kaup eða sölu eignar hér fyrir
        neðan.
      </Text>

      <Stack space={6}>
        <Fasteignir />

        <Okutaeki />

        <Box marginBottom={8}>
          <Text variant="h3" marginBottom={2}>
            Aðrir eignir
          </Text>
          <Text marginBottom={4}>Engar aðrar eignir eru skráðar á þig.</Text>
          <Button variant="ghost" icon="add" size="small">
            Skrá kaup eða sölu eignar
          </Button>
        </Box>
      </Stack>
    </div>
  )
}

const Fasteignir = () => {
  const { taxReturn, setTaxReturn } = useTaxContext()

  useEffect(() => {
    if (!taxReturn) return

    setTimeout(() => {
      setTaxReturn({
        ...taxReturn,
        realEstates: [
          {
            address: 'Borgartun',
            number: '654654',
            appraisal: 80_000_000,
          },
        ],
      })
    }, 500)
  }, [])

  if (!taxReturn?.realEstates) {
    return (
      <>
        <Text variant="h3" marginBottom={2}>
          Fasteignir
        </Text>
        <Text>Engar fasteignir eru skráðar á þig.</Text>
      </>
    )
  }

  const sum =
    taxReturn?.realEstates?.reduce((acc, x) => acc + (x.appraisal ?? 0), 0) ?? 0

  return (
    <>
      <Text variant="h3" marginBottom={2}>
        Fasteignir
      </Text>
      <T.Table>
        <T.Head>
          <T.Row>
            <T.HeadData>{'Fasteignarnúmer'}</T.HeadData>
            <T.HeadData>{'Heimilisfang'}</T.HeadData>
            <T.HeadData align="right">{'Fasteignamat'}</T.HeadData>
          </T.Row>
        </T.Head>
        <T.Body>
          {taxReturn?.realEstates?.map((x) => (
            <T.Row key={x.number}>
              <T.Data>{x.number}</T.Data>
              <T.Data>{x.address}</T.Data>
              <T.Data align="right">{formatISK(x.appraisal ?? 0)}</T.Data>
            </T.Row>
          ))}
        </T.Body>
        <T.Foot>
          <T.Row>
            <T.Data text={{ fontWeight: 'bold' }}>Samtals</T.Data>
            <T.Data>{/* empty */}</T.Data>
            <T.Data text={{ fontWeight: 'bold' }} align="right">
              {formatISK(sum)}
            </T.Data>
          </T.Row>
        </T.Foot>
      </T.Table>
    </>
  )
}

const Okutaeki = () => {
  const { taxReturn, setTaxReturn } = useTaxContext()

  useEffect(() => {
    if (!taxReturn) return

    setTimeout(() => {
      setTaxReturn({
        ...taxReturn,
        vehicles: [
          {
            registrationNumber: 'YV-V79',
            yearOfPurchase: 2019,
            purchasePrice: 2_200_000,
          },
        ],
      })
    }, 500)
  }, [])

  if (!taxReturn?.vehicles) {
    return (
      <>
        <Text variant="h3" marginBottom={2}>
          Ökutæki
        </Text>
        <Text>Engin ökutæki eru skráð á þig.</Text>
      </>
    )
  }

  const sum =
    taxReturn?.vehicles?.reduce((acc, x) => acc + (x.purchasePrice ?? 0), 0) ??
    0

  return (
    <>
      <Text variant="h3" marginBottom={2}>
        Ökutæki
      </Text>
      <T.Table>
        <T.Head>
          <T.Row>
            <T.HeadData>{'Bílnúmer'}</T.HeadData>
            <T.HeadData>{'Kaupár'}</T.HeadData>
            <T.HeadData align="right">{'Kaupverð'}</T.HeadData>
          </T.Row>
        </T.Head>
        <T.Body>
          {taxReturn?.vehicles?.map((x) => (
            <T.Row key={x.registrationNumber}>
              <T.Data>{x.registrationNumber}</T.Data>
              <T.Data>{x.yearOfPurchase}</T.Data>
              <T.Data align="right">{formatISK(x.purchasePrice ?? 0)}</T.Data>
            </T.Row>
          ))}
        </T.Body>
        <T.Foot>
          <T.Row>
            <T.Data text={{ fontWeight: 'bold' }}>Samtals</T.Data>
            <T.Data>{/* empty */}</T.Data>
            <T.Data text={{ fontWeight: 'bold' }} align="right">
              {formatISK(sum)}
            </T.Data>
          </T.Row>
        </T.Foot>
      </T.Table>
    </>
  )
}

export default Eignir
