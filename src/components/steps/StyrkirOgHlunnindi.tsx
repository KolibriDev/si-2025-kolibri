'use client'

import React from 'react'
import { Text } from '@/components/Text/Text'
import { Box } from '../Box/Box'
import * as T from '@/components/Table/Table'
import { Button } from '../Button/Button'
import { formatISK, formatNationalId } from '@/lib/utils'
import { BenefitInput, BenefitType } from '@/generated/graphql'
import { Select } from '../Select/Select'
import { Input } from '../Input/Input'
import { Icon } from '../IconRC/Icon'
import { useTaxContext } from '../Utils/context/taxContext'
import { Tag } from '../Tag/Tag'

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

export const Benefits = ({
  benefits,
  isEditable = false,
}: {
  benefits: BenefitInput[]
  isEditable?: boolean
}) => {
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
                <T.Data align="right">{formatISK(benefit.amount)}</T.Data>
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
                text={{ fontWeight: 'bold' }}
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
  const { taxReturn, updateTaxReturn } = useTaxContext()
  const [showNewBenefit, setShowNewBenefit] = React.useState(false)
  const [newBenefit, setNewBenefit] = React.useState<BenefitInput>({
    payerName: '',
    benefitType: null,
    payerNationalId: '',
    amount: 0,
  })
  const [menuIsOpen, setMenuIsOpen] = React.useState(false)

  const handleAmountChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const raw = e.target.value.replace(/[^\d]/g, '')
    setNewBenefit({
      ...newBenefit,
      amount: parseInt(raw || '0', 10),
    })
  }

  const formatDisplay = (amount: number) => {
    return `${new Intl.NumberFormat('nl-NL', { maximumFractionDigits: 0 }).format(amount)} kr.`
  }

  const formatWithoutKr = (amount: number) => {
    return amount.toLocaleString('nl-NL', { maximumFractionDigits: 0 })
  }

  const handleFocus = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.value.replace(' kr.', '')
    e.target.value = value
  }

  const handleBlur = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.target.value = formatDisplay(parseInt(e.target.value, 10))
  }

  const handleClear = () => {
    setShowNewBenefit(false)
    setNewBenefit({
      payerName: '',
      benefitType: null,
      payerNationalId: '',
      amount: 0,
    })
  }

  const handleSave = () => {
    if (!taxReturn) return

    updateTaxReturn({
      ...taxReturn,
      benefits: [...(taxReturn?.benefits ?? []), newBenefit],
    })

    handleClear()
  }

  console.log('newBenefit', newBenefit)

  const benefitPayers = [
    { label: 'Norðurljós Software ehf', value: '5408898990' },
    { label: 'Mús & Merki ehf.', value: '5605086019' },
    { label: 'VR', value: '6902692019' },
    { label: 'SÍBS', value: '5408898993' },
    { label: 'Ísland.is', value: '5408898994' },
    { label: 'Íslensk erfðagreining', value: '5408898995' },
    { label: 'Íslenskir aðalverktakar ehf.', value: '5408898996' },
    { label: 'Íslenskir aðalverktakar ehf.', value: '5408898997' },
  ]

  console.log('isMenuopen', menuIsOpen)

  const handleOnInputChange = (value: string) => {
    if (value != '') {
      setMenuIsOpen(true)
    } else {
      setMenuIsOpen(false)
    }
  }

  return (
    <div>
      <Text marginBottom={2}>
        Allir styrkir og starfstengd hlunnind sem þú hefur fengið greidd koma
        fram hér. Dæmi um þetta eru greiðslur frá vinnuveitendum, styrkir í
        gegnum stéttarfélög og náms- og vísindastyrkir.
      </Text>
      <Text marginBottom={6}>
        Ef þú fékkst greiddan styrk sem ekki kemur fram hér fyrir neðan þarftu
        að skrá hann til að framtalið sé rétt.
      </Text>
      <Benefits benefits={taxReturn?.benefits ?? []} isEditable={true} />
      {!showNewBenefit && (
        <Button
          variant="ghost"
          size="small"
          onClick={() => setShowNewBenefit(true)}
        >
          <Box display="flex" columnGap={1} alignItems="center">
            <Text variant="h5" fontWeight="semiBold" color="blue400">
              Bæta við
            </Text>
            <Icon icon="add" size="small" />
          </Box>
        </Button>
      )}
      {showNewBenefit && (
        <Box marginTop={4} display="flex" flexDirection="column" rowGap={3}>
          <Text variant="h5" fontWeight="semiBold">
            Þínir greiðendur:
          </Text>
          <Box display="flex" columnGap={2}>
            <Tag
              onClick={() =>
                setNewBenefit({
                  ...newBenefit,
                  payerName: 'Mús & Merki ehf.',
                  payerNationalId: '5605086019',
                })
              }
            >
              <Text variant="h5" fontWeight="semiBold">
                Mús & Merki ehf.
              </Text>
            </Tag>
            <Tag
              onClick={() =>
                setNewBenefit({
                  ...newBenefit,
                  payerName: 'Norðurljós Software ehf',
                  payerNationalId: '5408898990',
                })
              }
            >
              <Text variant="h5" fontWeight="semiBold">
                Norðurljós Software ehf
              </Text>
            </Tag>
            <Tag
              onClick={() =>
                setNewBenefit({
                  ...newBenefit,
                  payerName: 'VR',
                  payerNationalId: '6902692019',
                })
              }
            >
              <Text variant="h5" fontWeight="semiBold">
                VR
              </Text>
            </Tag>
          </Box>
          <Box display="flex" columnGap={1}>
            <Select
              name="benefitPayer"
              label="Greiðandi"
              options={benefitPayers}
              onChange={(option) => {
                setNewBenefit({
                  ...newBenefit,
                  payerName: option?.label ?? '',
                  payerNationalId: option?.value ?? '',
                })
                setMenuIsOpen(false)
              }}
              onInputChange={handleOnInputChange}
              backgroundColor="blue"
              placeholder="Greiðandi"
              icon="search"
              value={
                newBenefit.payerName
                  ? {
                      label: newBenefit.payerName,
                      value: newBenefit.payerNationalId,
                    }
                  : undefined
              }
              menuIsOpen={menuIsOpen}
            />
            <Input
              name="payerSsn"
              label="Kennitala greiðanda"
              backgroundColor="blue"
              placeholder=""
              value={formatNationalId(newBenefit.payerNationalId)}
              readOnly
            />
          </Box>

          <Select
            name="benefitType"
            label="Bæta við styrk eða hlunnindum"
            options={Object.values(BenefitType).map((value) => ({
              label: mapBenefitType(value),
              value,
            }))}
            onChange={(option) => {
              setNewBenefit({
                ...newBenefit,
                benefitType: option?.value ?? null,
              })
            }}
            backgroundColor="blue"
            placeholder="Veldu styrk eða hlunnindi"
            icon="search"
            value={
              newBenefit.benefitType
                ? {
                    label: mapBenefitType(newBenefit.benefitType),
                    value: newBenefit.benefitType,
                  }
                : undefined
            }
          />

          <Box position="relative">
            <Input
              name="amount"
              label="Upphæð"
              backgroundColor="blue"
              placeholder="0"
              value={formatWithoutKr(newBenefit.amount ?? 0)}
              onChange={handleAmountChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              inputMode="numeric"
            />
          </Box>

          <Box display="flex" flexDirection="rowReverse" columnGap={3}>
            <Button variant="primary" size="small" onClick={handleSave}>
              <Text variant="h5" fontWeight="semiBold" color="white">
                Vista
              </Text>
            </Button>

            <Button variant="ghost" size="small" onClick={handleClear}>
              <Text variant="h5" fontWeight="semiBold">
                Hætta við
              </Text>
            </Button>
          </Box>
        </Box>
      )}
    </div>
  )
}

export default StyrkirOgHlunnindi
