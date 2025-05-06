'use client'

import React from 'react'
import { Text } from '@/components/Text/Text'
import { RadioButton } from '../RadioButton/RadioButton'

import * as styles from './Slysatrygging.css'
import { useTaxContext } from '../Utils/context/taxContext'

const Slysatrygging = () => {
  const { taxReturn, setTaxReturn } = useTaxContext()

  if (!taxReturn) {
    return null
  }

  const handleOnChange = (value: boolean) => () => {
    setTaxReturn({
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
        <Text variant="h4" marginBottom={2}>
          Má bjóða þér slysatryggingu vegna heimilisstarfa?
        </Text>
        <div className={styles.inputContainer}>
          <RadioButton
            name="yes"
            backgroundColor="blue"
            label="Já, ég vil fá slysatryggingu"
            large
            onChange={handleOnChange(true)}
            checked={taxReturn.hasAccidentInsurance === true}
          />
          <RadioButton
            name="no"
            backgroundColor="blue"
            label="Nei, ég afþakka slysatryggingu"
            large
            onChange={handleOnChange(false)}
            checked={taxReturn.hasAccidentInsurance === false}
          />
        </div>
      </div>
    </div>
  )
}

export default Slysatrygging
