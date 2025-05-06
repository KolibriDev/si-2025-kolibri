'use client'

import React from 'react'
import { Text } from '@/components/Text/Text'
import { Bullet, BulletList } from '../BulletList/BulletList'
import { Box } from '../Box/Box'
import { Button } from '../Button/Button'

const AdrarTekjur = () => {
  return (
    <div>
      <Text marginBottom={2}>
        Hér eru skráðar allar aðrar tekjur. Dæmi um aðrar tekjur eru:
      </Text>
      <Box marginBottom={6}>
        <BulletList>
          <Bullet>Tekjur erlendis (aðrar en fjármagnstekjur)</Bullet>
          <Bullet>Skattfrjálsar greiðslur eða happdrættisvinningar</Bullet>
          <Bullet>
            Skattfrjáls ráðstöfun eða úttekt úr séreignarsjóði vegna íbúðarkaupa
          </Bullet>
        </BulletList>
      </Box>
      <Button variant="ghost" icon="add" size="small">
        Bæta við
      </Button>
    </div>
  )
}

export default AdrarTekjur
