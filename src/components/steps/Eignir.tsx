'use client'

import React from 'react'
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
        <Box>
          <Text variant="h3" marginBottom={2}>
            Fasteignir
          </Text>
          <Fasteignir />
        </Box>

        <Box>
          <Text variant="h3" marginBottom={2}>
            Ökutæki
          </Text>
          <Okutaeki />
        </Box>

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

export const Fasteignir = () => {
  const { taxReturn } = useTaxContext()

  if (!taxReturn?.realEstates) {
    return <Text>Engar fasteignir eru skráðar á þig.</Text>
  }

  const sum =
    taxReturn?.realEstates?.reduce(
      (acc, x) => acc + (x.appraisalAmount ?? 0),
      0,
    ) ?? 0

  return (
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
            <T.Data align="right">{formatISK(x.appraisalAmount ?? 0)}</T.Data>
          </T.Row>
        ))}
      </T.Body>
      <T.Foot>
        <T.Row>
          <T.Data text={{ fontWeight: 'bold' }} noBorderBottom>
            Samtals
          </T.Data>
          <T.Data noBorderBottom>{/* empty */}</T.Data>
          <T.Data text={{ fontWeight: 'bold' }} align="right" noBorderBottom>
            {formatISK(sum)}
          </T.Data>
        </T.Row>
      </T.Foot>
    </T.Table>
  )
}

export const Okutaeki = () => {
  const { taxReturn, setTaxReturn } = useTaxContext()

  if (!taxReturn?.vehicles) {
    return <Text>Engin ökutæki eru skráð á þig.</Text>
  }

  const sum =
    taxReturn?.vehicles?.reduce(
      (acc, x) => acc + (x.appraisalAmount ?? 0),
      0,
    ) ?? 0

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
        {taxReturn?.vehicles?.map((x) => (
          <T.Row key={x.registrationNumber}>
            <T.Data>{x.registrationNumber}</T.Data>
            <T.Data>{x.yearOfPurchase}</T.Data>
            <T.Data align="right">{formatISK(x.appraisalAmount ?? 0)}</T.Data>
          </T.Row>
        ))}
      </T.Body>
      <T.Foot>
        <T.Row>
          <T.Data text={{ fontWeight: 'bold' }} noBorderBottom>
            Samtals
          </T.Data>
          <T.Data noBorderBottom>{/* empty */}</T.Data>
          <T.Data text={{ fontWeight: 'bold' }} align="right" noBorderBottom>
            {formatISK(sum)}
          </T.Data>
        </T.Row>
      </T.Foot>
    </T.Table>
  )
}

export default Eignir
