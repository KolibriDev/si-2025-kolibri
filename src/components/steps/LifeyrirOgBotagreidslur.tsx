'use client'

import React from 'react'
import { Text } from '@/components/Text/Text'
import { Button } from '../Button/Button'
import { Box } from '../Box/Box'
import { EmptyTable } from '../EmptyTable/EmptyTable'

const LifeyrirOgBotagreidslur = () => {
  return (
    <div>
      <Text marginBottom={6}>
        Samkvæmt gögnum frá Skattinum fékkst þú hvorki greiðslur frá
        lífeyrissjóðum né bætur frá almannatryggingum á síðasta ári. Ef þetta er
        ekki rétt og þú fékkst greiðslur, þarftu að skráð þær hér til að
        framtalið sé rétt.
      </Text>

      <Box marginBottom={7}>
        <EmptyTable
          message={'Engar lífeyris- eða bótagreiðslur eru skráðar á þig'}
        />
      </Box>
      <Box display="flex" justifyContent="flexEnd">
        <Button variant="ghost" icon="add" size="small">
          Bæta við
        </Button>
      </Box>
    </div>
  )
}

export default LifeyrirOgBotagreidslur
