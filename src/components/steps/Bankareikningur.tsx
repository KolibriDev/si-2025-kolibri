'use client'

import React, { useEffect, useState } from 'react'
import { Text } from '@/components/Text/Text'
import { Input } from '@/components/Input/Input'

import * as styles from './Bankareikningur.css'
import { useTaxContext } from '../Utils/context/taxContext'

type accountNumberSection = {
  value: string
  errorMessage: string
}

const Bankareikningur = () => {
  const { taxReturn, updateTaxReturn } = useTaxContext()

  const [bank, setBank] = useState<accountNumberSection>({
    value: taxReturn?.bankAccount?.substring(0, 3) ?? '',
    errorMessage: '',
  })
  const [hb, setHb] = useState<accountNumberSection>({
    value: taxReturn?.bankAccount?.substring(3, 5) ?? '',
    errorMessage: '',
  })
  const [accountNumber, setAccountNumber] = useState<accountNumberSection>({
    value: taxReturn?.bankAccount?.substring(5) ?? '',
    errorMessage: '',
  })

  useEffect(() => {
    if (taxReturn) {
      setBank({
        value: taxReturn?.bankAccount?.substring(0, 4) ?? '',
        errorMessage: '',
      })
      setHb({
        value: taxReturn?.bankAccount?.substring(4, 6) ?? '',
        errorMessage: '',
      })
      setAccountNumber({
        value: taxReturn?.bankAccount?.substring(6) ?? '',
        errorMessage: '',
      })
    }
  }, [taxReturn])

  const formatDisplay = (digits: string, maxLength: number) => {
    return digits.slice(0, maxLength)
  }

  const onBankiChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = event.target.value?.trim()
    setBank({
      value: value,
      errorMessage: value ? '' : 'Banki má ekki vera autt',
    })
  }

  const onHbChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = event.target.value?.trim()
    setHb({
      value: value,
      errorMessage: value ? '' : 'Hb. má ekki vera autt',
    })
  }

  const onAccuntNumberChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = event.target.value?.trim()
    setAccountNumber({
      value: value,
      errorMessage: value ? '' : 'Reikningsnúmer má ekki vera autt',
    })
  }

  /* TODO: update the fields when pressing continue */
  const onBlur = () => {
    if (taxReturn) {
      updateTaxReturn({
        ...taxReturn,
        bankAccount: bank.value + hb.value + accountNumber.value,
      })
    }
  }

  return (
    <div>
      <Text marginBottom={6}>
        {
          'Sláðu inn númer bankareiknings sem þú vilt nota til að fá inneign greidda inn á. Inneign er greidd út 1. júní ef niðurstaða álagningar er að þú hafir greitt of mikið í tekjuskatt og/eða fjármagnstekjuskatt.'
        }
      </Text>

      <div className={styles.inputContainer}>
        <div className={styles.bankAndHBContainer}>
          <Input
            required
            backgroundColor="blue"
            label="Banki"
            name="Banki"
            type="number"
            placeholder="0000"
            value={formatDisplay(bank.value, 4)}
            onChange={onBankiChange}
            errorMessage={bank.errorMessage}
            onBlur={onBlur}
          />
          <Input
            required
            backgroundColor="blue"
            label="Hb."
            name="Hb."
            type="number"
            placeholder="00"
            value={formatDisplay(hb.value, 2)}
            onChange={onHbChange}
            errorMessage={hb.errorMessage}
            onBlur={onBlur}
          />
        </div>
        <div className={styles.rn}>
          <Input
            required
            backgroundColor="blue"
            label="Reikningsnúmer."
            name="Reikningsnúmer"
            type="number"
            placeholder="000000"
            value={formatDisplay(accountNumber.value, 6)}
            onChange={onAccuntNumberChange}
            errorMessage={accountNumber.errorMessage}
            onBlur={onBlur}
          />
        </div>
      </div>
    </div>
  )
}

export default Bankareikningur
