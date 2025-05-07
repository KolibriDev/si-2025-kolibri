'use client'

import React from 'react'
import { Text } from '@/components/Text/Text'
import { Bullet, BulletList } from '../BulletList/BulletList'

const Upplysingar = () => {
  return (
    <div>
      <Text marginBottom={2}>Nokkrir punktar áður en þú byrjar:</Text>
      <BulletList>
        <Bullet>
          Flestir framteljendur þurfa eingöngu að yfirfara þau gögn sem hafa
          verið send Skattinum um tekjur, eignir og skuldir.
        </Bullet>
        <Bullet>
          Þú getur bætt við tekjum og frádráttarliðum, gert grein fyrir kaupum
          og sölu eigna og skráð upplýsingar um íbúðalán og greiðslur af þeim.
        </Bullet>
        <Bullet>
          Til að gera aðrar leiðréttingar eða fylla út rekstrareyðublöð þarftu
          að opna almennt skattframtal á þjónustuvef Skattsins og skila því þar.
          <span>asd</span>
        </Bullet>
        <Bullet>
          Samþykkt skattframtal á Ísland.is er sent í vinnslu til Skattsins.
          Hægt er að biðja um leiðréttingu á þjónustuvef Skattsins.
        </Bullet>
        <Bullet>
          Hægt er að skoða framtöl á Mínum síðum á Ísland.is eftir að þau hafa
          verið staðfest af Skattinum.
        </Bullet>
      </BulletList>
    </div>
  )
}

export default Upplysingar
