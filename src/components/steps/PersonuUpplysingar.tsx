'use client'

import React, { useState } from 'react'
import { Text } from '@/components/Text/Text'
import { Input } from '@/components/Input/Input'
import { Box } from '@/components/Box/Box'
import { Divider } from '../Divider/Divider'

import * as styles from './PersonuUpplysingar.css'

const PersonuUpplysingar = () => {
  const [email, setEmail] = useState('jokull.thordarson@email.is')
  const [phoneNumber, setPhoneNumber] = useState('7778391')
  const address = 'Bláfjallagata 12, 105 Reykjavík'
  return (
    <div>
      <Box marginBottom={6}>
        <Text marginBottom={1}>
          {
            'Til að Skatturinn geti átt samskipti við þig þarftu að skrá netfang og símanúmer. '
          }
        </Text>
        <Text>
          {
            'Við sækjum staðfest netfang og símanúmer frá Mínum síðum á Ísland.is ef það er til.'
          }
        </Text>
      </Box>

      <div className={styles.tranparentCard}>
        <div>
          <Text variant="h4">{'Lögheimili'}</Text>
          <Text>{address}</Text>
        </div>

        <Box paddingY={4}>
          <Divider />
        </Box>

        <Box paddingBottom={4}>
          <Text variant="h4">{'Tengslaupplýsingar'}</Text>
          <Text>
            {
              'Netfang og símanúmer er sótt á mínar síður á Ísland.is. Ef upplýsingarnar eru ekki réttar eða vantar setur þú þær inn hér.'
            }
          </Text>
        </Box>

        <div className={styles.inputContainer}>
          <Input
            backgroundColor="blue"
            label="Netfang"
            name="email"
            onChange={(x) => setEmail(x.target.value)}
            placeholder="jon.jonsson@gmail.com"
            type="email"
            value={email}
          />
          <Input
            backgroundColor="blue"
            label="Símanúmer"
            name="phoneNumber"
            onChange={(x) => setPhoneNumber(x.target.value)}
            placeholder="5812345"
            type="number"
            value={phoneNumber}
          />
        </div>
      </div>
    </div>
  )
}

export default PersonuUpplysingar
