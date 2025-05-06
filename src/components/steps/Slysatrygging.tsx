'use client'

import React, { useState } from 'react'
import { Text } from '@/components/Text/Text'
import { RadioButton } from '../RadioButton/RadioButton'

import * as styles from './Slysatrygging.css'

const Slysatrygging = () => {
  const [state, setState] = useState<'yes' | 'no' | undefined>(undefined)
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
            onChange={() => setState('yes')}
            checked={state === 'yes'}
          />
          <RadioButton
            name="no"
            backgroundColor="blue"
            label="Nei, ég afþakka slysatryggingu"
            large
            onChange={() => setState('no')}
            checked={state === 'no'}
          />
        </div>
      </div>
    </div>
  )
}

export default Slysatrygging
