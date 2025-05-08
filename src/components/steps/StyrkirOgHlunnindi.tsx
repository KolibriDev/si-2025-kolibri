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
import LoadingDots from '../LoadingDots/LoadingDots'
import * as styles from './Steps.css'
import { motion, AnimatePresence } from 'framer-motion'

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
            <AnimatePresence initial={false}>
              {benefits.map((benefit, index) => (
                <motion.tr
                  key={`${benefit.payerName}-${index}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {isEditable && (
                    <T.Data>
                      <Button
                        circle
                        colorScheme="negative"
                        title="Breyta"
                        type="icon"
                        icon={'pencil'}
                        size="small"
                        onClick={() => {}}
                      />
                    </T.Data>
                  )}
                  <T.Data>{benefit.payerName}</T.Data>
                  <T.Data>{mapBenefitType(benefit.benefitType)}</T.Data>
                  <T.Data align="right" text={{ whiteSpace: 'nowrap' }}>
                    {formatISK(benefit.amount)}
                  </T.Data>
                </motion.tr>
              ))}
            </AnimatePresence>
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
  const { taxReturn, updateTaxReturn } = useTaxContext()
  const [showNewBenefit, setShowNewBenefit] = React.useState(false)
  const [newBenefit, setNewBenefit] = React.useState<BenefitInput>({
    payerName: '',
    benefitType: null,
    payerNationalId: '',
    amount: 0,
  })
  const [menuIsOpen, setMenuIsOpen] = React.useState(false)
  const topRef = React.useRef<HTMLDivElement | null>(null)

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

    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 0)
  }

  const handleSave = () => {
    if (!taxReturn) return
    handleClear()

    setTimeout(() => {
      //topRef.current?.scrollIntoView({ behavior: 'smooth' })

      setTimeout(() => {
        updateTaxReturn({
          ...taxReturn,
          benefits: [...(taxReturn?.benefits ?? []), newBenefit],
        })
        handleClear()
      }, 400)
    }, 0)
  }

  const benefitPayers = [
    { label: 'Advania Ísland ehf.', value: '5902697199' },
    { label: 'Foodco hf', value: '6603022630' },
    { label: 'Norðurljós Software ehf.', value: '5408898990' },
    { label: 'Heit gólf ehf.', value: '4502071600' },
    { label: 'Heitir pottar ehf.', value: '5612201230' },
    { label: 'Hagar hf.', value: '6702032120' },
    { label: 'Kolibri ehf.', value: '5505071960' },
    { label: 'Norðurorka hf.', value: '5509780169' },
    { label: 'Mús & Merki ehf.', value: '5605086019' },
    { label: 'VR', value: '6902692019' },
    { label: 'SÍBS', value: '5408898993' },
    { label: 'Icelandair ehf.', value: '4712992359' },
    { label: 'Íslensk erfðagreining', value: '5408898995' },
    { label: 'Íslenskir aðalverktakar ehf.', value: '5408898996' },
    { label: 'Íslenskir aðalverktakar ehf.', value: '5408898997' },
    { label: 'Ístak hf.', value: '4302140190' },
  ]

  const handleOnInputChange = (value: string) => {
    if (value != '') {
      setMenuIsOpen(true)
    } else {
      setMenuIsOpen(false)
    }
  }

  const formRef = React.useRef<HTMLDivElement | null>(null)

  return (
    <div ref={topRef}>
      <Text marginBottom={2}>
        Allir styrkir og starfstengd hlunnindi sem þú hefur fengið greidd
        samkvæmt upplýsingum frá Skattinum koma fram hér. Ef þú fékkst styrk eða
        hlunnindi sem ekki koma fram á yfirlitinu þarftu að skrá það til að
        framtalið sé rétt.
      </Text>
      <Text marginBottom={6}>
        Frádráttur vegna styrkja og hlunninda er skráður á næstu síðu.
      </Text>
      {taxReturn ? (
        <Benefits benefits={taxReturn.benefits ?? []} isEditable={true} />
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ height: '377px' }}
        >
          <LoadingDots />
        </Box>
      )}
      <AnimatePresence>
        {!showNewBenefit && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            <Button
              variant="ghost"
              size="small"
              onClick={() => {
                setShowNewBenefit(true)
                setTimeout(() => {
                  formRef.current?.scrollIntoView({ behavior: 'smooth' })
                }, 0)
              }}
            >
              <Box display="flex" columnGap={1} alignItems="center">
                <Text variant="h5" fontWeight="semiBold" color="blue400">
                  Bæta við
                </Text>
                <Icon icon="add" size="small" />
              </Box>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showNewBenefit && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            <Box marginBottom={6} />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showNewBenefit && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              //marginTop={4}
              display="flex"
              flexDirection="column"
              rowGap={3}
              ref={formRef}
              marginBottom={14}
            >
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
              <Box display="flex" columnGap={3}>
                <Box position="relative" width="full">
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
                </Box>
                <Box position="relative" className={styles.smallBox}>
                  <Input
                    name="payerSsn"
                    label="Kennitala greiðanda"
                    backgroundColor="blue"
                    placeholder=""
                    value={formatNationalId(newBenefit.payerNationalId)}
                    readOnly
                    width="full"
                  />
                </Box>
              </Box>
              <Box display="flex" columnGap={3} width="full">
                <Box position="relative" width="full">
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
                    value={
                      newBenefit.benefitType
                        ? {
                            label: mapBenefitType(newBenefit.benefitType),
                            value: newBenefit.benefitType,
                          }
                        : undefined
                    }
                  />
                </Box>

                <Box position="relative" className={styles.smallBox}>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default StyrkirOgHlunnindi
