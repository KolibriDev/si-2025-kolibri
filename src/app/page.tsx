'use client'

import styles from './page.module.css'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { Box } from '@/components/Box/Box'
import { Text } from '@/components/Text/Text'
import { Button } from '@/components/Button/Button'
import CompanyLogo from '@/components/CompanyLogo/CompanyLogo'
import TableOfContents from '@/components/TableOfContents/TableOfContents'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { useRouter } from 'next/navigation'
import {
  UserProvider,
  useUserContext,
} from '@/components/Utils/context/userContext'
import { useEffect } from 'react'
import { Hidden } from '@/components/Hidden/Hidden'
import { Tag } from '@/components/Tag/Tag'
import IconButton from '@/components/IconButton/IconButton'

export default function Home() {
  const router = useRouter()
  const { user, fetchNationalRegister } = useUserContext()

  useEffect(() => {
    fetchNationalRegister(user?.phoneNumber ?? '7884888')
  }, [fetchNationalRegister, user?.phoneNumber])

  return (
    <UserProvider>
      <div className={styles.page}>
        <Header userName={user?.name ?? 'Notandi fannst ekki'} authenticated />
        <div className={styles.grid}>
          <div className={styles.grid_info_mobile}>
            <Button variant="text" size="small" preTextIcon="arrowBack">
              Fjármál og skattar
            </Button>
            <Tag outlined={false} variant="purple">
              Skatturinn
            </Tag>
          </div>
          <aside className={styles.grid_item_side}>
            <Hidden
              below="md"
              children={
                <>
                  <Box marginBottom={3}>
                    <Button variant="text" size="small" preTextIcon="arrowBack">
                      Fjármál og skattar
                    </Button>
                  </Box>
                  <Box marginBottom={3}>
                    <CompanyLogo center />
                  </Box>
                  <TableOfContents
                    title="Efnisyfirlit"
                    items={[
                      'Skattframtal einstaklinga',
                      'Ítarlegar leiðbeiningar',
                      'Álagning og forsendur hennar',
                      'Eftir skil á framtali',
                    ]}
                  />
                </>
              }
            />
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
            <Hidden
              below="md"
              children={
                <Box marginBottom={4}>
                  <Breadcrumbs
                    items={[
                      { title: 'Ísland.is' },
                      { title: 'Fjármál og skattar' },
                      { title: 'Skattframtal einstaklinga', isTag: true },
                    ]}
                  />
                </Box>
              }
            />
            <Text variant="h1" as="h1" marginBottom={[5, 4]}>
              Skattframtal einstaklinga
            </Text>
            <Hidden above="sm">
              <Box
                borderRadius="large"
                background="blue100"
                display="flex"
                justifyContent="spaceBetween"
                padding={2}
                marginBottom={5}
              >
                <Text variant="h4" color="blue400">
                  Skattframtal einstaklinga
                </Text>
                <IconButton icon="chevronDown" colorScheme="blue" />
              </Box>
            </Hidden>
            <Hidden below="md">
              <Box
                display="flex"
                background="blue100"
                borderRadius="large"
                padding={[2, 4]}
                marginBottom={4}
              >
                <Box
                  display="flex"
                  alignItems={['flexStart', 'flexStart', 'flexStart', 'center']}
                  justifyContent="spaceBetween"
                  width="full"
                  flexDirection={['column', 'column', 'column', 'row']}
                  rowGap={[1, 1, 1, 0]}
                >
                  <Text variant="h3" color="blue600">
                    Skattframtal einstaklinga
                  </Text>
                  <Button
                    size="small"
                    icon="open"
                    iconType="outline"
                    onClick={() => router.push('/login')}
                  >
                    Opna framtal
                  </Button>
                </Box>
              </Box>
            </Hidden>
            <Text marginBottom={[5, 6]}>
              Allir einstaklingar 16 ára og eldri þurfa að skila skattframtali
              árlega. Fyrir flesta einstaklinga er nóg að yfirfara forskráðar
              upplýsingar og staðfesta að þær séu réttar.
            </Text>
            <Text variant="h2" as="h2" marginBottom={2}>
              Skil á skattframtali og álagning
            </Text>
            <Text marginBottom={[5, 6]}>
              Opnað er fyrir skil á skattframtali í febrúar ár hvert. Allir
              skattskyldir aðilar fá tilkynningu í stafrænt pósthólf Ísland.is
              þegar framtal er opnað. Frestur til að skila skattframtali 2025
              (fyrir árið 2024) er til <strong>14. mars 2025.</strong> Álagning
              og útborgun inneignar fer fram <strong>1. júní 2025.</strong>
            </Text>
            <Text variant="h3" as="h3" marginBottom={2}>
              Getur fólk í hjónabandi eða sambúð skilað sameiginlegu framtali?
            </Text>
            <Text marginBottom={1}>
              Hjón eru samsköttuð og er nóg er að annað hjóna skili framtali.
            </Text>
            <Text marginBottom={[5, 6]}>
              Pör skráð í sambúð geta valið að telja fram saman og þá eru þau
              samsköttuð frá og með því framtali sem það er valið.
            </Text>
            <Text variant="h3" as="h3" marginBottom={1}>
              Hvað þarf ég að skrá mikið af upplýsingum?
            </Text>
            <Text marginBottom={1}>
              Langmest af upplýsingum á skattframtali kemur forskráð frá
              launagreiðendum, fjármálafyrirtækjum og öðrum aðilum sem skila
              gögnum til Skattsins.
            </Text>
            <Text marginBottom={1}>
              Í flestum tilfellum þarftu eingöngu að yfirfara og samþykkja þessi
              gögn. Algengar leiðréttingar og viðbætur eru einnig í boði á
              Ísland.is.
            </Text>
            <Text marginBottom={10}>
              Ef þú þarft að skila rekstrar- eða erfðafjárskýrslum þarftu eins
              og er að opna
              <span
                className={styles.link}
              >{` almennt framtal hjá Skattinum`}</span>
              .
            </Text>
            <div className={styles.cta}>
              <Box
                display="flex"
                background="blue100"
                padding={2}
                marginBottom={4}
                borderRadius="large"
              >
                <Box
                  display="flex"
                  alignItems={['flexStart']}
                  flexDirection={'column'}
                  rowGap={1}
                  width="full"
                >
                  <Text variant="h5" color="blue600">
                    Skattframtal einstaklinga
                  </Text>
                  <Button
                    size="small"
                    icon="open"
                    iconType="outline"
                    onClick={() => router.push('/login')}
                  >
                    Opna framtal
                  </Button>
                </Box>
              </Box>
            </div>
            <Hidden below="lg">
              <CompanyLogo href="href" />
            </Hidden>
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
    </UserProvider>
  )
}
