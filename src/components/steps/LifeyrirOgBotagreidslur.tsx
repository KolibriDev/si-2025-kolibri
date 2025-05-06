'use client'

import React from 'react'
import { Text } from '@/components/Text/Text'
import { Button } from '../Button/Button'

const LifeyrirOgBotagreidslur = () => {
  return (
    <div>
      <Text marginBottom={6}>
        Samkvæmt gögnum frá Skattinum fékkst þú hvorki greiðslur frá
        lífeyrissjóðum né bætur frá almannatryggingum á síðasta ári. Ef þetta er
        ekki rétt og þú fékkst greiðslur, þarftu að skráð þær hér til að
        framtalið sé rétt.
      </Text>
      <Button variant="ghost" icon="add" size="small">
        Bæta við
      </Button>
    </div>
  )
}

export default LifeyrirOgBotagreidslur
