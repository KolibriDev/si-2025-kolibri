'use client'

import styles from './page.module.css'
import { useState } from 'react'
import { GetGreetingsQuery, useGetGreetingsQuery } from '@/generated/graphql'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { Box } from '@/components/Box/Box'
import { Text } from '@/components/Text/Text'
import { Button } from '@/components/Button/Button'
import CompanyLogo from '@/components/CompanyLogo/CompanyLogo'
import TableOfContents from '@/components/TableOfContents/TableOfContents'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { Bullet, BulletList } from '@/components/BulletList/BulletList'

export default function Home() {
  const [data, setData] = useState('Ekkert komið')

  useGetGreetingsQuery({
    variables: {
      nationalId: '0000000000',
    },
    onCompleted: (data: GetGreetingsQuery) => {
      setData(data.greetings || 'Fékk ekki svar')
    },
    onError: (error: Error) => {
      console.error('Error fetching greetings:', error)
      setData('Fékk villu')
    },
  })

  console.log(data)

  return (
    <div className={styles.page}>
      <Box paddingX={6}>
        <Header userName="Jökull Þórðarson" authenticated />
      </Box>
      <div className={styles.grid}>
        <aside className={styles.grid_item_side}>
          <Box marginBottom={3}>
            <Button variant="text" size="small" preTextIcon="arrowBack">
              Fjármál og skattar
            </Button>
          </Box>
          <Box marginBottom={3}>
            <CompanyLogo />
          </Box>
          <TableOfContents />
          <Box
            display="flex"
            flexDirection="column"
            borderRadius="large"
            background="purple100"
            columnGap={2}
            padding={4}
          >
            <Text variant="eyebrow" color="blueberry600" marginBottom={2}>
              Tengt efni
            </Text>
            <Box
              component="ul"
              display="flex"
              flexDirection="column"
              rowGap={1}
            >
              <li>
                <Text color="blueberry600">
                  Skattframtal barns undir 16 ára
                </Text>
              </li>
              <li>
                <Text color="blueberry600">Skattframtal lögaðila</Text>
              </li>
            </Box>
          </Box>
        </aside>
        <main className={styles.main}>
          <Box marginBottom={4}>
            <Breadcrumbs
              items={[
                { title: 'Ísland.is' },
                { title: 'Fjármál og skattar' },
                { title: 'Skattframtal einstaklinga', isTag: true },
              ]}
            />
          </Box>
          <Text variant="h1" as="h1" marginBottom={4}>
            Skattframtal einstaklinga
          </Text>
          <Box
            display="flex"
            background="blue100"
            borderRadius="large"
            padding={4}
            marginBottom={4}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="spaceBetween"
              width="full"
            >
              <Text variant="h3" color="blue600">
                Skattframtal einstaklinga
              </Text>
              <Button size="small" icon="open" iconType="outline">
                Skila framtali
              </Button>
            </Box>
          </Box>
          <Text marginBottom={6}>
            Allir einstaklingar 16 ára og eldri þurfa að skila skattframtali
            árlega. Fyrir flesta einstaklinga er nóg að yfirfara forskráðar
            upplýsingar og staðfesta að þær séu réttar.
          </Text>
          <Text variant="h2" as="h2" marginBottom={2}>
            Skil á skattframtali og álagning
          </Text>
          <Text marginBottom={6}>
            Opnað er fyrir skil á skattframtali í febrúar ár hvert. Frestur til
            að skila framtali fyrir árið 2024 er til{' '}
            <strong>14. mars 2025.</strong> Álagning og útborgun inneignar fer
            fram <strong>1. júní 2025.</strong>
          </Text>
          <Text variant="h3" as="h3" marginBottom={2}>
            Getur fólk í hjónabandi eða sambúð skilað sameiginlegu framtali?
          </Text>
          <Text marginBottom={1}>
            Hjón eru samsköttuð og er nóg er að annað hjóna skili framtali.
          </Text>
          <Text marginBottom={6}>
            Pör skráð í sambúð geta valið að telja fram saman og þá eru þau
            samsköttuð frá og með því framtali sem það er valið.
          </Text>
          <Text variant="h3" as="h3" marginBottom={1}>
            Hvað þarf ég að skrá mikið af upplýsingum?
          </Text>
          <Text marginBottom={1}>
            Langmest af upplýsingum á skattframtali kemur forskráð frá
            launagreiðendum, fjármálafyrirtækjum og öðrum aðilum sem skila
            gögnum til skattsins.
          </Text>
          <Text marginBottom={1}>
            Í flestum tilfellum þarftu eingöngu að yfirfara og samþykkja þessi
            gögn. Þá skilarðu skattframtali án þess að fara af Ísland.is.
          </Text>
          <Text marginBottom={1}>
            Ef þú þarft að leiðrétta gögn eða skila fylgigögnum þarftu að opna
            almennt framtal hjá Skattinum.
          </Text>
          <Text marginBottom={2}>Til dæmis:</Text>
          <Box marginBottom={10}>
            <BulletList>
              <Bullet>
                Ef þú keyptir eða seldir fasteign, ökutæki eða verðbréf á árinu
              </Bullet>
              <Bullet>Ef þú tókst nýtt íbúðalán eða endurfjármagnaðir</Bullet>
              <Bullet>
                Ef þú þarft að skila rekstrarblöðum eða öðrum fylgiskjölum
              </Bullet>
            </BulletList>
          </Box>
          <CompanyLogo href="href" />
        </main>
      </div>
      <Footer
        topLinks={[
          {
            title: 'Stafrænt Ísland',
            href: '',
          },
          {
            title: 'Stofnanir',
            href: '',
          },
          {
            title: 'Þjónusta Ísland.is',
            href: '',
          },
        ]}
        showMiddleLinks
        middleLinksTitle="Þjónustuflokkar"
        middleLinks={[
          {
            title: 'Akstur og bifreiðar',
            href: '',
          },
          {
            title: 'Fjármál og skattar',
            href: '',
          },
          {
            title: 'Dómstólar og réttarfar',
            href: '',
          },
          {
            title: 'Atvinnurekstur og sjálfstætt starfandi',
            href: '',
          },
          {
            title: 'Fjölskylda og velferð',
            href: '',
          },
          {
            title: 'Heilbrigðismál',
            href: '',
          },
          {
            title: 'Húsnæðismál',
            href: '',
          },
          {
            title: 'Iðnaður',
            href: '',
          },
          {
            title: 'Innflytjendamál',
            href: '',
          },
          {
            title: 'Launþegi, réttindi og lífeyrir',
            href: '',
          },
          {
            title: 'Málefni fatlaðs fólks',
            href: '',
          },
          {
            title: 'Menntun',
            href: '',
          },
          {
            title: 'Neytendamál',
            href: '',
          },
          {
            title: 'Samfélag og réttindi',
            href: '',
          },
          {
            title: 'Umhverfismál',
            href: '',
          },
          {
            title: 'Vegabréf, ferðalög og búseta erlendis',
            href: '',
          },
        ]}
      />
    </div>
  )
}
