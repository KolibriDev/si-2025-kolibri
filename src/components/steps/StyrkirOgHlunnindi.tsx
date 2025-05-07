'use client'

import React from 'react'
import { Text } from '@/components/Text/Text'
import { useTaxContext } from '../Utils/context/taxContext'
import { Box } from '../Box/Box'
import * as T from '@/components/Table/Table'
import { Button } from '../Button/Button'
import { formatISK } from '@/lib/utils'
import { BenefitInput, BenefitType } from '@/generated/graphql'
import { Icon } from '../IconRC/Icon'

export const Benefits = ({
  benefits,
  isEditable = false,
}: {
  benefits: BenefitInput[]
  isEditable?: boolean
}) => {
  const mapBenefitType = (benefitType?: BenefitType | null) => {
    switch (benefitType) {
      case BenefitType.DAILY_ALLOWANCE:
        return 'Dagpeningar'
      case BenefitType.DRIVING_ALLOWANCE:
        return 'Ökutækjastyrkur'
      case BenefitType.CAR_ALLOWANCE:
        return 'Bílahlunnindi'
      case BenefitType.HOUSING_ALLOWANCE:
        return 'Húsnæðishlunnindi'
      case BenefitType.SPORT_ALLOWANCE:
        return 'Íþróttastyrkur'
      case BenefitType.TRANSPORT_ALLOWANCE:
        return 'Samgöngustyrkur'
      case BenefitType.STUDY_ALLOWANCE:
        return 'Námsstyrkur'
      case BenefitType.RESEARCH_ALLOWANCE:
        return 'Rannsóknar- eða vísindastyrkur'
      case BenefitType.OTHER_ALLOWANCE:
        return 'Aðrir styrkir eða hlunnindi'
      default:
        return 'Ekki skráð'
    }
  }
  return (
    <>
      <Box marginBottom={3}>
        <T.Table>
          <T.Head>
            <T.Row>
              {isEditable && <T.HeadData>{/* empty */}</T.HeadData>}
              <T.HeadData>{'Nafn greiðanda'}</T.HeadData>
              <T.HeadData>{'Hlunnindi eða styrkur'}</T.HeadData>
              <T.HeadData align="right">{'Upphæð'}</T.HeadData>
            </T.Row>
          </T.Head>
          <T.Body>
            {benefits.map((benefit, index) => (
              <T.Row key={`${benefit.payerName}-${index}`}>
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
                <T.Data>{benefit.payerName}</T.Data>
                <T.Data>{mapBenefitType(benefit.benefitType)}</T.Data>
                <T.Data align="right" text={{ whiteSpace: 'nowrap' }}>
                  {formatISK(benefit.amount)}
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
              <T.Data noBorderBottom>{/* empty */}</T.Data>
              <T.Data
                text={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}
                align="right"
                noBorderBottom
              >
                {
                  //TODO: Fix ! below
                  formatISK(benefits.reduce((v, a) => v + a.amount!, 0))
                }
              </T.Data>
            </T.Row>
          </T.Foot>
        </T.Table>
      </Box>
    </>
  )
}

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
      <Benefits benefits={benefits ?? []} isEditable={true} />
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

export default StyrkirOgHlunnindi
