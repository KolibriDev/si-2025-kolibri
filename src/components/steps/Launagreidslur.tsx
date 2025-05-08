'use client'

import React from 'react'
import { Text } from '@/components/Text/Text'
import { Box } from '@/components/Box/Box'
import * as T from '@/components/Table/Table'
import { Button } from '@/components/Button/Button'
import { formatISK, formatNationalId } from '@/lib/utils'
import { useTaxContext } from '../Utils/context/taxContext'
import { SalaryInput } from '@/generated/graphql'
import { Icon } from '../IconRC/Icon'
import LoadingDots from '../LoadingDots/LoadingDots'
import { Select } from '../Select/Select'
import { Input } from '../Input/Input'

export const SalaryEntries = ({
  salaryEntries,
  isEditable = false,
}: {
  salaryEntries: SalaryInput[]

  isEditable?: boolean
}) => {
  return (
    <>
      <Box marginBottom={3}>
        <T.Table>
          <T.Head>
            <T.Row>
              {isEditable && <T.HeadData>{/* empty */}</T.HeadData>}
              <T.HeadData>{'Launagreiðandi'}</T.HeadData>
              <T.HeadData>{'Kennitala'}</T.HeadData>
              <T.HeadData align="right">{'Launafjárhæð'}</T.HeadData>
            </T.Row>
          </T.Head>
          <T.Body>
            {salaryEntries.map((salaryEntry, index) => (
              <T.Row key={`${salaryEntry.employerName} - ${index}`}>
                {isEditable && (
                  <T.Data>
                    <Button
                      circle
                      colorScheme="negative"
                      title="Expand"
                      type="icon"
                      icon={'pencil'}
                      size="small"
                      onClick={() => {}}
                    />
                  </T.Data>
                )}
                <T.Data>{salaryEntry.employerName}</T.Data>
                <T.Data>
                  {formatNationalId(salaryEntry.employerNationalId)}
                </T.Data>
                <T.Data align="right" text={{ whiteSpace: 'nowrap' }}>
                  {formatISK(salaryEntry.amount)}
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
                {formatISK(
                  // TODO: FIX ! below
                  salaryEntries.reduce((v, a) => v + a.amount! || 0, 0),
                )}
              </T.Data>
            </T.Row>
          </T.Foot>
        </T.Table>
      </Box>
    </>
  )
}

const Launagreidslur = () => {
  const { taxReturn, updateTaxReturn } = useTaxContext()
  const [menuIsOpen, setMenuIsOpen] = React.useState(false)
  const [showNewBenefit, setShowNewBenefit] = React.useState(false)
  const [newSalary, setNewSalary] = React.useState<SalaryInput>({
    employerName: '',
    employerNationalId: '',
    amount: 0,
  })

  const handleAmountChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const raw = e.target.value.replace(/[^\d]/g, '')
    setNewSalary({
      ...newSalary,
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

  const salaryEntries = taxReturn?.salaries

  const salaryPayers = [
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

  const handleClear = () => {
    setShowNewBenefit(false)
    setNewSalary({
      employerName: '',
      employerNationalId: '',
      amount: 0,
    })
  }

  const handleSave = () => {
    if (!taxReturn) return

    updateTaxReturn({
      ...taxReturn,
      salaries: [...(taxReturn?.salaries ?? []), newSalary],
    })

    handleClear()
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
      {taxReturn ? (
        <SalaryEntries salaryEntries={salaryEntries ?? []} isEditable={true} />
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ height: '277px' }}
        >
          <LoadingDots />
        </Box>
      )}
      <Box display="flex" justifyContent="flexEnd">
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
      </Box>
      {showNewBenefit && (
        <Box marginTop={4} display="flex" flexDirection="column" rowGap={3}>
          <Box display="flex" columnGap={3}>
            <Box position="relative" width="half">
              <Select
                name="benefitPayer"
                label="Launagreiðandi"
                options={salaryPayers}
                onChange={(option) => {
                  setNewSalary({
                    ...newSalary,
                    employerName: option?.label ?? '',
                    employerNationalId: option?.value ?? '',
                  })
                  setMenuIsOpen(false)
                }}
                onInputChange={handleOnInputChange}
                backgroundColor="blue"
                placeholder="Launagreiðandi"
                icon="search"
                value={
                  newSalary.employerName
                    ? {
                        label: newSalary.employerName,
                        value: newSalary.employerNationalId,
                      }
                    : undefined
                }
                menuIsOpen={menuIsOpen}
              />
            </Box>
            <Box position="relative" width="half">
              <Input
                name="payerSsn"
                label="Kennitala greiðanda"
                backgroundColor="blue"
                placeholder=""
                value={formatNationalId(newSalary.employerNationalId)}
                readOnly
              />
            </Box>
          </Box>

          <Box display="flex" columnGap={3}>
            <Box position="relative" width="half">
              <Input
                name="amount"
                label="Launafjárhæð"
                backgroundColor="blue"
                placeholder="0"
                value={formatWithoutKr(newSalary.amount ?? 0)}
                onChange={handleAmountChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                inputMode="numeric"
              />
            </Box>
            <Box position="relative" width="half" />
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

export default Launagreidslur
