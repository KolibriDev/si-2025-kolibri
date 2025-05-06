'use client'

import React, { Fragment, useEffect, useState } from 'react'
import { Text } from '@/components/Text/Text'
import { useTaxContext } from '../Utils/context/taxContext'
import * as T from '../Table/Table'
import { formatDateIS, formatISK } from '@/lib/utils'
import AnimateHeight from 'react-animate-height'
import SubTable from '../SubTable/SubTable'
import { Button } from '../Button/Button'
import { Box } from '../Box/Box'

const Ibudalan = () => {
  return (
    <Box marginBottom={10}>
      <Text marginBottom={6}>
        Öll lán til kaupa á eigin fasteign eru skráð hér. Yfirlitið er byggt á
        gögnum frá lánveitendum. Ef það vantar gögn í yfirlitið, t.d. ef þú
        breyttir skilmálum eða endurfjármagnaðir lán, geturðu bætt þeim við.
      </Text>

      <Mortgages />

      <Box marginTop={6}>
        <Button variant="ghost" size="small" icon="add">
          Bæta við íbúðarláni
        </Button>
      </Box>
    </Box>
  )
}

const Mortgages = () => {
  const { taxReturn } = useTaxContext()

  if (!taxReturn?.mortgages) {
    return (
      <>
        <Text>Engin íbúðarlán eru skráðar á þig.</Text>
      </>
    )
  }

  const sumRemainingBalance =
    taxReturn?.mortgages?.reduce(
      (acc, x) => acc + (x.remainingBalance ?? 0),
      0,
    ) ?? 0

  const sumInterestPayments =
    taxReturn?.mortgages?.reduce(
      (acc, x) => acc + (x.interestPayments ?? 0),
      0,
    ) ?? 0

  return (
    <>
      <Text variant="h3" marginBottom={2}>
        {taxReturn.realEstates?.[0]?.address}
      </Text>
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
          {taxReturn?.mortgages?.map((x) => (
            <Mortgage key={x.loanNumber} mortgage={x} />
          ))}
        </T.Body>
        <T.Foot>
          <T.Row>
            <T.Data text={{ fontWeight: 'bold' }}>Samtals</T.Data>
            <T.Data>{/* empty */}</T.Data>
            <T.Data>{/* empty */}</T.Data>
            <T.Data text={{ fontWeight: 'bold' }} align="right">
              {formatISK(sumInterestPayments)}
            </T.Data>
            <T.Data text={{ fontWeight: 'bold' }} align="right">
              {formatISK(sumRemainingBalance)}
            </T.Data>
          </T.Row>
        </T.Foot>
      </T.Table>
    </>
  )
}

type mortgages = NonNullable<
  NonNullable<
    Required<ReturnType<typeof useTaxContext>>['taxReturn']
  >['mortgages']
>

type mortgage = mortgages[number]

const Mortgage = ({ mortgage }: { mortgage: mortgage }) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <Fragment key={mortgage.loanNumber}>
      <T.Row>
        <T.Data>
          <Button
            circle
            size="small"
            title="Expand"
            type="light"
            variant="ghost"
            icon={expanded ? 'remove' : 'add'}
            onClick={() => setExpanded((prev) => !prev)}
          />
        </T.Data>
        <T.Data>{mortgage.lenderName}</T.Data>
        <T.Data>{mortgage.loanNumber}</T.Data>
        <T.Data align="right">
          {formatISK(mortgage.interestPayments ?? 0)}
        </T.Data>
        <T.Data align="right">
          {formatISK(mortgage.remainingBalance ?? 0)}
        </T.Data>
      </T.Row>
      <T.Row>
        <T.Data
          box={{ background: 'blue100' }}
          colSpan={5}
          borderColor="transparent"
          style={{ padding: 0 }}
        >
          <AnimateHeight duration={300} height={expanded ? 'auto' : 0}>
            <Box padding={'p5'}>
              <SubTable
                data={[
                  {
                    value: mortgage.lenderNationalId ?? '',
                    label: 'Kennitala lánveitanda',
                    useWhiteBackground: true,
                  },
                  {
                    value: 'Vantar',
                    label: 'Kaupár',
                    useWhiteBackground: true,
                  },
                  {
                    value: mortgage.loanStartDate
                      ? formatDateIS(new Date(mortgage.loanStartDate))
                      : '',
                    label: 'Lántökudagur',
                  },
                  {
                    value: mortgage.loanTermYears?.toString() ?? '',
                    label: 'Lánstími í árum',
                  },
                  {
                    value: mortgage.totalAnnualPayments
                      ? formatISK(mortgage.totalAnnualPayments)
                      : '',
                    label: 'Heildargreiðslur ársins',
                    useWhiteBackground: true,
                  },
                  {
                    value: mortgage.interestPayments
                      ? formatISK(mortgage.interestPayments)
                      : '',
                    label: 'Afborgun á nafnverði',
                    useWhiteBackground: true,
                  },
                ]}
              />
            </Box>
          </AnimateHeight>
        </T.Data>
      </T.Row>
    </Fragment>
  )
}

export default Ibudalan
