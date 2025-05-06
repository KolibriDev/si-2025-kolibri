'use client'

import React, { useState } from 'react'
import { Text } from '@/components/Text/Text'
import { Icon } from '../IconRC/Icon'
import { Box } from '../Box/Box'
import { Checkbox } from '../Checkbox/Checkbox'

const Gagnaoflun = () => {
  const [isAcceptingTerms, setIsAcceptingTerms] = useState<boolean>(false)
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
        backgroundColor="blue"
        label="Ég skil að ofangreindra gagna verður aflað í ferlinu"
        onChange={(evt) => setIsAcceptingTerms(evt.target.checked)}
        checked={isAcceptingTerms}
        large
      />
    </div>
  )
}

export default Gagnaoflun
