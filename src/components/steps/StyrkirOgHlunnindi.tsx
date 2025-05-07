'use client'

import React from 'react'
import { Text } from '@/components/Text/Text'
import { useTaxContext } from '../Utils/context/taxContext'
import { Box } from '../Box/Box'
import * as T from '@/components/Table/Table'
import { Button } from '../Button/Button'
import { formatISK } from '@/lib/utils'
import { BenefitType } from '@/generated/graphql'

const StyrkirOgHlunnindi = () => {
  const { taxReturn } = useTaxContext()

  const benefits = taxReturn?.benefits

  const mapBenefitType = (benefitType?: BenefitType | null) => {
    switch (benefitType) {
      case BenefitType.DailyAllowance:
        return 'Dagpeningar'
      case BenefitType.SportAllowance:
        return 'Íþróttastyrkur'
      case BenefitType.StudyAllowance:
        return 'Starfsmenntastyrkur'
      case BenefitType.Other:
        return 'Annað'
      default:
        return 'Ekki skráð'
    }
  }

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
                  <T.HeadData>{'Nafn greiðanda'}</T.HeadData>
                  <T.HeadData>{'Hlunnindi eða styrkur'}</T.HeadData>
                  <T.HeadData align="right">{'Upphæð'}</T.HeadData>
                </T.Row>
              </T.Head>
              <T.Body>
                {benefits.map((benefit, index) => (
                  <T.Row key={`${benefit.payerName}-${index}`}>
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
                    <T.Data>{benefit.payerName}</T.Data>
                    <T.Data>{mapBenefitType(benefit.benefitType)}</T.Data>
                    <T.Data align="right">{formatISK(benefit.amount)}</T.Data>
                  </T.Row>
                ))}
              </T.Body>
              <T.Foot>
                <T.Row>
                  <T.Data text={{ fontWeight: 'bold' }}>Samtals:</T.Data>
                  <T.Data>{/* empty */}</T.Data>
                  <T.Data>{/* empty */}</T.Data>
                  <T.Data text={{ fontWeight: 'bold' }} align="right">
                    {
                      //TODO: Fix ! below
                      formatISK(benefits.reduce((v, a) => v + a.amount!, 0))
                    }
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
