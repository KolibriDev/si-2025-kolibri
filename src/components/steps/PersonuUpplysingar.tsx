'use client'

import React, { useEffect, useState } from 'react'
import { Text } from '@/components/Text/Text'
import { Input } from '@/components/Input/Input'
import { Box } from '@/components/Box/Box'
import { Divider } from '../Divider/Divider'

import * as styles from './PersonuUpplysingar.css'
import { useTaxContext } from '../Utils/context/taxContext'
import { formatPhoneNr } from '../Utils/utils'
import { Stack } from '../Stack/Stack'
import LoadingDots from '../LoadingDots/LoadingDots'

const PersonuUpplysingar = () => {
  const { taxReturn, updateTaxReturn } = useTaxContext()
  const [email, setEmail] = useState(taxReturn?.email ?? '')

  const [phoneNumber, setPhoneNumber] = useState(taxReturn?.phoneNumber ?? '')

  useEffect(() => {
    if (taxReturn) {
      setEmail(taxReturn?.email ?? '')
      setPhoneNumber(taxReturn?.phoneNumber ?? '')
    }
  }, [taxReturn])

  /* TODO: update the fields when pressing continue */
  const onBlur = () => {
    if (!taxReturn) return
    updateTaxReturn({ ...taxReturn, email, phoneNumber })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const onlyDigits = e.target.value.replace(/\D/g, '').slice(0, 7)
    setPhoneNumber(onlyDigits)
  }

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
        <Stack space={1}>
          <Text variant="h4">{'Lögheimili'}</Text>
          {taxReturn?.address ? (
            <Text>{taxReturn.address}</Text>
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center">
              <LoadingDots />
            </Box>
          )}
        </Stack>

        <Box paddingY={4}>
          <Divider />
        </Box>

        <Box paddingBottom={4}>
          <Stack space={1}>
            <Text variant="h4">{'Tengslaupplýsingar'}</Text>
            <Text>
              {
                'Netfang og símanúmer er sótt á mínar síður á Ísland.is. Ef upplýsingarnar eru ekki réttar eða vantar setur þú þær inn hér.'
              }
            </Text>
          </Stack>
        </Box>
        {taxReturn ? (
          <>
            <div className={styles.inputContainer}>
              <Input
                required
                backgroundColor="blue"
                label="Netfang"
                name="email"
                onChange={(x) => setEmail(x.target.value)}
                placeholder="jon.jonsson@gmail.com"
                type="email"
                value={email}
                onBlur={onBlur}
              />
              <Input
                required
                backgroundColor="blue"
                label="Símanúmer"
                name="phoneNumber"
                onChange={handleChange}
                placeholder="581-2345"
                type="tel"
                value={formatPhoneNr(phoneNumber)}
                onBlur={onBlur}
              />
            </div>
          </>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ height: '77px' }}
          >
            <LoadingDots />
          </Box>
        )}
      </div>
    </div>
  )
}

export default PersonuUpplysingar
