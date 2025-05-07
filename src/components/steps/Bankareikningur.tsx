'use client'

import React, { useState } from 'react'
import { Text } from '@/components/Text/Text'
import { Input } from '../Input/Input'

import * as styles from './Bankareikningur.css'

type accountNumberSection = {
  value: string
  errorMessage: string
}

const Bankareikningur = () => {
  const [bank, setBank] = useState<accountNumberSection>({
    value: '0137',
    errorMessage: '',
  })
  const [hb, setHb] = useState<accountNumberSection>({
    value: '26',
    errorMessage: '',
  })
  const [accountNumber, setAccountNumber] = useState<accountNumberSection>({
    value: '005010',
    errorMessage: '',
  })

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
            backgroundColor="blue"
            label="Banki"
            name="Banki"
            type="number"
            value={bank.value}
            onChange={onBankiChange}
            errorMessage={bank.errorMessage}
          />
          <Input
            backgroundColor="blue"
            label="Hb."
            name="Hb."
            type="number"
            value={hb.value}
            onChange={onHbChange}
            errorMessage={hb.errorMessage}
          />
        </div>
        <div className={styles.rn}>
          <Input
            backgroundColor="blue"
            label="Reikningsnúmer."
            name="Reikningsnúmer"
            type="number"
            value={accountNumber.value}
            onChange={onAccuntNumberChange}
            errorMessage={accountNumber.errorMessage}
          />
        </div>
      </div>
    </div>
  )
}

export default Bankareikningur
