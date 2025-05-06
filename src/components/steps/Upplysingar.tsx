'use client'

import React from 'react'
import { Text } from '@/components/Text/Text'
import { Bullet, BulletList } from '../BulletList/BulletList'

const Upplysingar = () => {
  return (
    <div>
      <Text marginBottom={2}>
        Þú ert að hefja skil á einfaldri útgáfu skattframtals. Á Ísland.is er
        eingöngu hægt að yfirfara fyrirfram skráðar upplýsingar byggðar á gögnum
        sem hafa borist Skattinum um tekjur þínar, eignir og skuldir. Þú getur
        bætt við tekjum og frádráttarliðum en til að leiðrétta aðra liði eða
        skila fylgiskjölum þarftu að opna almennt skattframtal á þjónustuvef
        Skattsins.
      </Text>
      <BulletList>
        <Bullet>
          Ef þú ert í hjónabandi, eða hefur óskað eftir samsköttun með maka,
          færðu einnig upp tekjur fyrir maka. Eignir og skuldir eru
          sameiginlegar á framtalinu.
        </Bullet>
        <Bullet>
          Samþykkt skattframtal á Ísland.is er sent í vinnslu til Skattsins.
          Hægt er að biðja um leiðréttingu á þjónustuvef Skattsins.
        </Bullet>
        <Bullet>Hægt er að skoða fyrri framtöl á Mínum síðum.</Bullet>
      </BulletList>
    </div>
  )
}

export default Upplysingar
