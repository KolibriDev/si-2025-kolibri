'use client'

import React, { useEffect } from 'react'
import { Text } from '@/components/Text/Text'
import { Icon } from '../IconRC/Icon'
import { Box } from '../Box/Box'
import { Checkbox } from '../Checkbox/Checkbox'
import { useError } from '../Utils/context/errorContext'
import { useUserContext } from '../Utils/context/userContext'
import { useTaxContext } from '../Utils/context/taxContext'

const Gagnaoflun = () => {
  const error = useError()
  const user = useUserContext()
  const { taxReturn } = useTaxContext()
  const hasError = error?.errors.includes('ACCEPTING_TERMS')

  useEffect(() => {
    error?.clearAllErrors()
  }, [user.isAcceptingTerms])

  return (
    <div>
      <Box display="flex" alignItems="center" columnGap={2} marginBottom={5}>
        <Icon icon="fileTrayFull" type="outline" color="blue400" />
        <Text variant="h4" as="h2">
          Eftirfarandi gögn verða sótt rafrænt með þínu samþykki
        </Text>
      </Box>
      <Box marginBottom={5}>
        <Box marginBottom={3}>
          <Text variant="h5" as="h2" color="blue400">
            Skatturinn
          </Text>
          <Text>
            Gögn send Skattinum um fjármál þín á síðasta ári, m.a. frá
            launagreiðendum og fjármálafyrirtækjum. Upplýsingar um
            ráðstöfunarreikning fyrir inneign sem Skatturinn hefur áður fengið
            frá þér.
          </Text>
        </Box>
        <Box marginBottom={3}>
          <Text variant="h5" as="h2" color="blue400">
            Þjóðskrá Íslands
          </Text>
          <Text>Lögheimili og hjúskaparstaða.</Text>
        </Box>
        <Box marginBottom={3}>
          <Text variant="h5" as="h2" color="blue400">
            Mínar upplýsingar á Mínum síðum Ísland.is
          </Text>
          <Text>Upplýsingar um símanúmer og netfang.</Text>
        </Box>
      </Box>
      <Checkbox
        name="gagnaoflun-samthyggi"
        hasError={hasError}
        errorMessage="Samþykkja þarf gagnaöflun"
        backgroundColor="blue"
        label="Ég skil að ofangreindra gagna verður aflað í ferlinu"
        onChange={(evt) => user.setIsAcceptingTerms(evt.target.checked)}
        checked={!!taxReturn || user.isAcceptingTerms}
        disabled={!!taxReturn}
        large
      />
    </div>
  )
}

export default Gagnaoflun
