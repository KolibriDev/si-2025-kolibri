'use client'

import React from 'react'
import { Text } from '@/components/Text/Text'
import { AlertMessage } from '../AlertMessage/AlertMessage'
import Image from 'next/image'
import { useWindowSize } from 'react-use'
import { Box } from '../Box/Box'
import { Button } from '../Button/Button'
import { useRouter } from 'next/navigation'
import { Stack } from '../Stack/Stack'
import FakeLink from '../FakeLink/FakeLink'

const Stadfesting = () => {
  const router = useRouter()
  const { width } = useWindowSize()
  const dynamicWidth = Math.min(width * 0.4, 337) // adjust 0.5 as needed

  return (
    <div>
      <Box marginBottom={5} marginTop={3}>
        <AlertMessage
          title="Framtali skilað"
          message="Framtalið þitt hefur verið sent í vinnslu til Skattsins."
          type="success"
        />
      </Box>
      <Text marginBottom={3}>
        Samkvæmt bráðabirgðaútreikningi ert þú í <strong>inneign</strong>{' '}
        gagnvart Skattinum og færð greiddar <strong>117.244 kr.</strong> þann 1.
        júní nk. Þessi tala er með fyrirvara um endanlega álagningu.
      </Text>
      <Box marginBottom={4}>
        <Stack space={2}>
          <Text>
            Ef þú þarft að uppfæra framtalið eftir sendingu þarftu að senda
            beiðni um leiðréttingu á
            <FakeLink>{` þjónustuvef Skattsins `}</FakeLink>.
          </Text>
          <Text>
            Staðfest afrit verður aðgengilegt á Mínum síðum Ísland.is um leið og
            framtalið hefur verið yfirfarið og samþykkt af Skattinum.
          </Text>
        </Stack>
      </Box>
      <Box position="relative" style={{ height: dynamicWidth }}>
        <Image
          src="/success.svg"
          alt=""
          fill
          style={{
            objectFit: 'contain',
          }}
          priority
        />
      </Box>
      <Box marginTop={3} display="flex" justifyContent={'flexEnd'}>
        <Button
          variant="text"
          iconType="outline"
          icon="open"
          onClick={() =>
            router.push(
              '/api/graphql?query=query+Example+%7B%0A++submittedTaxReturn%28nationalId%3A+%221203894569%22%29+%7B%0A++++nationalId%0A++++name%0A++++address%0A++++email%0A++++phoneNumber%0A++++hasAccidentInsurance%0A++++bankAccount%0A++++attachments+%7B%0A++++++name%0A++++++size%0A++++++fileType%0A++++%7D%0A++++salaries+%7B%0A++++++employerName%0A++++++employerNationalId%0A++++++amount%0A++++%7D%0A++++benefits+%7B%0A++++++payerNationalId%0A++++++payerName%0A++++++amount%0A++++%7D%0A++++deductions+%7B%0A++++++deductionType%0A++++++amount%0A++++%7D%0A++++realEstates+%7B%0A++++++number%0A++++++address%0A++++++appraisalAmount%0A++++%7D%0A++++vehicles+%7B%0A++++++registrationNumber%0A++++++yearOfPurchase%0A++++++appraisalAmount%0A++++%7D%0A++++mortgages+%7B%0A++++++realEstateNumber%0A++++++lenderNationalId%0A++++++lenderName%0A++++++loanNumber%0A++++++loanStartDate%0A++++++loanAmount%0A++++++loanTermYears%0A++++++totalAnnualPayments%0A++++++principalPayments%0A++++++interestPayments%0A++++++remainingBalance%0A++++%7D%0A++++otherDebts+%7B%0A++++++lenderNationalId%0A++++++lenderName%0A++++++interestPayments%0A++++++remainingBalance%0A++++%7D%0A++%7D%0A++individual%28phoneNumber%3A+%227884888%22%29+%7B%0A++++name%0A++++nationalId%0A++%7D%0A%7D',
            )
          }
        >
          Skoða útreikning
        </Button>
      </Box>
    </div>
  )
}

export default Stadfesting
