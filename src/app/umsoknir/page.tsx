'use client'

import styles from './page.module.css'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { Box } from '@/components/Box/Box'
import { Text } from '@/components/Text/Text'
import { Button } from '@/components/Button/Button'
import TableOfContents from '@/components/TableOfContents/TableOfContents'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { Logo } from '@/components/Logo/Logo'
import { Input } from '@/components/Input/Input'
import { ActionCard } from '@/components/ActionCard/ActionCard'
import { useUserContext } from '@/components/Utils/context/userContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Hidden } from '@/components/Hidden/Hidden'
import IconButton from '@/components/IconButton/IconButton'
import { getFlatRouteSteps } from '../framtal/routeSections'

export default function Home() {
  const { user, fetchNationalRegister } = useUserContext()
  const router = useRouter()

  const flatSteps = getFlatRouteSteps()
  const savedStep =
    typeof window !== 'undefined'
      ? (localStorage.getItem('currentStep') ?? 'upplysingar')
      : 'upplysingar'
  const currentIndex = flatSteps.indexOf(savedStep)
  const currentProgress = currentIndex !== -1 ? currentIndex + 1 : 1
  const maxProgress = flatSteps.length

  useEffect(() => {
    fetchNationalRegister(user?.phoneNumber ?? '7884888')
  }, [fetchNationalRegister, user?.phoneNumber])

  return (
    <div className={styles.page}>
      <Header userName={user?.name ?? 'Notandi fannst ekki '} authenticated />
      <div className={styles.grid}>
        <aside className={styles.grid_item_side}>
          <Hidden below="md">
            <Box marginBottom={3}>
              <Button variant="text" size="small" preTextIcon="arrowBack">
                Til baka í yfirlit
              </Button>
            </Box>
            <TableOfContents
              title="Umsóknir"
              titleIcon="fileTrayFull"
              items={[
                'Mínar umsóknir',
                'Umsóknir í vinnslu',
                'Ókláraðar umsóknir',
                'Kláraðar umsóknir',
              ]}
            />
          </Hidden>
        </aside>
        <main className={styles.main}>
          <Box marginBottom={[3, 3, 3, 4]}>
            <Breadcrumbs
              items={[
                { title: 'Ísland.is' },
                { title: 'Fjármál og skattar' },
                { title: 'Skattframtal einstaklinga', isTag: true },
              ]}
            />
          </Box>
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
                Umsóknir
              </Text>
              <IconButton icon="chevronDown" colorScheme="blue" />
            </Box>
          </Hidden>
          <div className={styles.content_grid}>
            <div className={styles.content_grid_item}>
              <Text variant="h1" as="h1" marginBottom={3}>
                Umsóknir í vinnslu
              </Text>
              <Text>
                Hér sérðu yfirlit yfir þær umsóknir sem þú hefur sótt um í
                gegnum Ísland.is
              </Text>
            </div>
            <div className={styles.content_grid_item_logo}>
              <Logo id="island-is-logo" width={64} height={64} iconOnly />
            </div>
          </div>
          <Box
            display="flex"
            flexDirection={['column', 'row']}
            columnGap={4}
            rowGap={3}
            marginBottom={4}
          >
            <Input
              name="Umsókn"
              size="xs"
              label="Leit"
              backgroundColor="blue"
              placeholder="Leita að umsókn"
              icon={{ name: 'search', type: 'outline' }}
              width="full"
            />
            <Input
              name="Stofnanir"
              size="xs"
              label="Stofnanir"
              backgroundColor="blue"
              placeholder="Leita að umsókn"
              value="Allar stofnanir"
              onChange={() => {}}
              icon={{ name: 'chevronDown', type: 'outline' }}
              width="full"
            />
          </Box>
          <Box>
            <Text variant="h5" marginBottom={3}>
              Ókláraðar umsóknir
            </Text>
            <ActionCard
              heading="Skattaskýrsla 2025"
              text={`Þú hefur lokið ${currentProgress} skrefum af ${maxProgress}`}
              tag={{ label: 'Opin', outlined: false }}
              cta={{
                label: 'Opna umsókn',
                variant: 'ghost',
                icon: undefined,
                size: 'small',
                onClick: () => {
                  router.push(`/framtal/nytt/${savedStep}`)
                },
              }}
              progressMeter={{ currentProgress, maxProgress }}
            />
          </Box>
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
