'use client'

import React from 'react'
import { Text } from '@/components/Text/Text'
import { RadioButton } from '../RadioButton/RadioButton'

import * as styles from './Slysatrygging.css'
import { useTaxContext } from '../Utils/context/taxContext'
import { Inline } from '../Inline/Inline'
import { Box } from '../Box/Box'
import { useEffect, useState } from 'react'

const Slysatrygging = () => {
  const { taxReturn, updateTaxReturn } = useTaxContext()
  const [localAccidentInsurance, setLocalAccidentInsurance] = useState<
    boolean | undefined | null
  >(undefined)

  useEffect(() => {
    if (taxReturn) {
      setLocalAccidentInsurance(taxReturn.hasAccidentInsurance)
    }
  }, [taxReturn])

  if (!taxReturn || localAccidentInsurance === undefined) {
    return null
  }

  const handleOnChange = (value: boolean) => () => {
    setLocalAccidentInsurance(value)
    updateTaxReturn({
      ...taxReturn,
      hasAccidentInsurance: value,
    })
  }

  return (
    <div>
      <Text marginBottom={2}>
        Þú getur valið að óska eftir slysatryggingu vegna heimilisstarfa.
        Tryggingin veitir þér sömu vernd frá almannatryggingum og trygging fyrir
        vinnuslysi ef slys ber að höndum við ólaunuð heimilisstörf, svo sem
        þrif, viðhald eða garðvinnu á eigin heimili.{' '}
      </Text>
      <Text marginBottom={6}>
        Iðgjald fyrir trygginguna er 550 kr. fyrir hvern einstakling á ári.
      </Text>

      <div>
        <Box marginBottom={3}>
          <Inline space={1}>
            <Text variant="h4">
              Má bjóða þér slysatryggingu vegna heimilisstarfa?{' '}
              <span className={styles.requiredStar}>*</span>
            </Text>
          </Inline>
        </Box>
        <div className={styles.inputContainer}>
          <RadioButton
            name="yes"
            backgroundColor="blue"
            label="Já, ég vil fá slysatryggingu"
            large
            onChange={handleOnChange(true)}
            checked={localAccidentInsurance === true}
          />
          <RadioButton
            name="no"
            backgroundColor="blue"
            label="Nei, ég afþakka slysatryggingu"
            large
            onChange={handleOnChange(false)}
            checked={localAccidentInsurance === false}
          />
        </div>
      </div>
    </div>
  )
}

export default Slysatrygging
