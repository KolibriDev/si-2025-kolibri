'use client'
import { Box } from '@/components/Box/Box'
import * as styles from './layout.css'
import { GridContainer } from '@/components/Grid/GridContainer/GridContainer'
import { GridRow } from '@/components/Grid/GridRow/GridRow'
import { GridColumn } from '@/components/Grid/GridColumn/GridColumn'
import { Text } from '@/components/Text/Text'
import FormStepper from '@/components/FormStepper/FormStepper'
import { Logo } from '@/components/Logo/Logo'
import { FC, PropsWithChildren } from 'react'
import Section from '@/components/Section/Section'
import { Link } from '@/components/Link/Link'
import * as linkStyles from '@/components/Link/Link.css'
import cn from 'classnames'
import { useParams, useRouter } from 'next/navigation'

export interface RouteSection {
  name: string
  href?: string
  isActive?: boolean
  children: {
    name: string
    href?: string
    isActive?: boolean
    onClick?: () => void
  }[]
}

const routeSections: RouteSection[] = [
  {
    name: 'Forsendur',
    children: [
      { name: 'Upplýsingar', href: 'upplysingar' },
      { name: 'Gagnaöflun', href: 'gagnaoflun' },
    ],
  },
  {
    name: 'Mínar upplýsingar',
    href: '/minar-upplysingar',
    children: [
      {
        name: 'Persónuupplýsingar',
        href: 'personuupplysingar',
      },
      {
        name: 'Bankareikningur',
        href: 'bankareikningur',
      },
      {
        name: 'Slysatrygging',
        href: 'slysatrygging',
      },
    ],
  },
  {
    name: 'Tekjur',
    href: '/tekjur',
    children: [
      {
        name: 'Laun',
        href: 'laun',
      },
      {
        name: 'Hlunnindi og styrkir',
        href: 'hlunnindi-og-styrkir',
      },
      {
        name: 'Lífeyrir og bætur',
        href: 'lyfeyrir-og-baetur',
      },
      {
        name: 'Frádráttur',
        href: 'fradrattur',
      },
      {
        name: 'Aðrar tekjur',
        href: 'adar-tekjur',
      },
    ],
  },
  {
    name: 'Fjármangstekjur',
    children: [
      {
        name: 'Bankainnistæður',
        href: 'bankainnistadur',
      },
      {
        name: 'Verðbréf',
        href: 'verdbréf',
      },
      {
        name: 'Aðrar fjármagnstekjur',
        href: 'adar-fjarmagnstekjur',
      },
    ],
  },
  {
    name: 'Eignir',
    children: [
      {
        name: 'Fasteignir',
        href: 'eignir',
      },
      {
        name: 'Ökutæki',
        href: 'okutæki',
      },
      {
        name: 'Aðrar eignir',
        href: 'adar-eignir',
      },
    ],
  },
  {
    name: 'Skuldir',
    children: [
      {
        name: 'Íbúðalán',
        href: 'ibudalán',
      },
      {
        name: 'Aðrar skuldir',
        href: 'adar-skuldir',
      },
    ],
  },
  {
    name: 'Yfirlit',
    href: '/yfirlit',
    children: [],
  },
  {
    name: 'Staðfesting',
    href: '/stadfesting',
    children: [],
  },
]

const SubsectionChild: FC<
  PropsWithChildren<{
    isActive?: boolean
  }>
> = ({ isActive = false, children }) => (
  <Box className={styles.name}>
    <Text as="div" lineHeight="lg" fontWeight={isActive ? 'semiBold' : 'light'}>
      {children}
    </Text>
  </Box>
)

interface SectionProps {
  section: RouteSection
  index: number
  activeSection?: number
  activeSubSection?: number
}

const DisplaySection: FC<SectionProps> = ({
  section,
  index,
  activeSection,
}) => {
  return (
    <Section
      section={section.name}
      sectionIndex={index}
      isActive={section.isActive}
      isComplete={activeSection ? index < activeSection : false}
      subSections={section.children.map((subSection, index) =>
        subSection.href ? (
          <Link
            href={subSection.href}
            underline="small"
            key={`${subSection.name}-${index}`}
          >
            <SubsectionChild isActive={subSection.isActive ?? false}>
              {subSection.name}
            </SubsectionChild>
          </Link>
        ) : subSection.onClick ? (
          <Box
            key={`${subSection.name}-${index}`}
            component="button"
            onClick={subSection.onClick}
            className={cn(
              linkStyles.underlineVisibilities['hover'],
              linkStyles.underlines['small'],
            )}
          >
            <SubsectionChild isActive={subSection.isActive ?? false}>
              {subSection.name}
            </SubsectionChild>
          </Box>
        ) : (
          <SubsectionChild
            key={`${subSection.name}-${index}`}
            isActive={subSection.isActive}
          >
            {subSection.name}
          </SubsectionChild>
        ),
      )}
    />
  )
}

const SidePanel: FC = () => {
  const params = useParams()
  const router = useRouter()

  const step = params.step as string | undefined
  const id = params.id as string | undefined

  const enhancedSections: RouteSection[] = routeSections.map((section) => {
    const isSectionActive =
      step === section.href?.replace('/', '') ||
      section.children.some((child) => child.href === id)

    return {
      ...section,
      isActive: isSectionActive,
      children: section.children.map((child) => {
        const isChildActive = child.href === id
        return {
          ...child,
          isActive: isChildActive,
          onClick: () => {
            if (section.href && child.href) {
              router.push(`${section.href}/${child.href}`)
            }
          },
        }
      }),
    }
  })

  const activeSection = enhancedSections.findIndex((s) => s.isActive)
  const activeSubSection = enhancedSections[activeSection]?.children.findIndex(
    (s) => s.isActive,
  )

  return (
    <GridColumn span={['12/12', '12/12', '4/12', '3/12']}>
      <div className={styles.formStepperContainer}>
        <Box marginLeft={[0, 0, 2]}>
          <Box marginBottom={7} display={['none', 'none', 'block']}>
            <Logo />
          </Box>

          <Box marginBottom={6}>
            <Text variant="h3" as="h3">
              Test
            </Text>
          </Box>
          <FormStepper
            sections={enhancedSections.map((section, index) => (
              <DisplaySection
                key={`${section.name}-${index}`}
                section={section}
                index={index}
                activeSection={activeSection}
                activeSubSection={activeSubSection}
              />
            ))}
          />
        </Box>
      </div>
    </GridColumn>
  )
}

export default function FramtalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Box
      paddingY={[0, 0, 3, 6]}
      paddingX={[0, 0, 4]}
      background="purple100"
      className={styles.processContainer}
    >
      <GridContainer className={styles.container}>
        <GridRow direction={['columnReverse', 'columnReverse', 'row']}>
          <GridColumn span={['12/12', '12/12', '8/12', '8/12']}>
            <Box
              background="white"
              borderColor="white"
              paddingTop={[3, 3, 10, 10]}
              className={styles.processContent}
            >
              {children}
            </Box>
          </GridColumn>
          <SidePanel />
        </GridRow>
      </GridContainer>
    </Box>
  )
}
