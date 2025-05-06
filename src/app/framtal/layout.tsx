'use client'
import { Box } from '@/components/Box/Box'
import * as styles from './layout.css'
import { GridContainer } from '@/components/Grid/GridContainer/GridContainer'
import { GridRow } from '@/components/Grid/GridRow/GridRow'
import { GridColumn } from '@/components/Grid/GridColumn/GridColumn'
import { Text } from '@/components/Text/Text'
import FormStepper from '@/components/FormStepper/FormStepper'
import { FC, PropsWithChildren } from 'react'
import Section from '@/components/Section/Section'
import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/Header/Header'
import { RouteSection, routeSections } from './routeSections'
import cn from 'classnames'
import * as linkStyles from '@/components/Link/Link.css'
import { TaxContextProvider } from '@/components/Utils/context/taxContext'
import { useUserContext } from '@/components/Utils/context/userContext'
import Image from 'next/image'

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

  const step = params?.step as string | undefined

  if (!step) {
    return null
  }

  const enhancedSections: RouteSection[] = routeSections.map((section) => {
    const isSectionActive =
      section.href === step ||
      section.children.some((child) => child.href === step)

    return {
      ...section,
      isActive: isSectionActive,
      children: section.children.map((child) => {
        const isChildActive = child.href === step
        return {
          ...child,
          onClick: () => {
            if (child.href) {
              router.push(child.href)
            }
          },
          isActive: isChildActive,
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
      <Image
        src="/companyLogo.svg"
        alt="Logo skattsins"
        width={288}
        height={74}
        priority
      />
    </GridColumn>
  )
}

export default function FramtalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useUserContext()

  return (
    <TaxContextProvider>
      <Header userName={user?.name ?? 'Notandi fannst ekki'} authenticated />
      <Box
        paddingY={[0, 0, 4, 6]}
        paddingX={[0, 0, 4, 6]}
        background="purple100"
        className={styles.processContainer}
      >
        <GridContainer className={styles.container}>
          <GridRow direction={['columnReverse', 'columnReverse', 'row']}>
            <GridColumn span={['12/12', '12/12', '8/12', '8/12', '9/12']}>
              {children}
            </GridColumn>
            <SidePanel />
          </GridRow>
        </GridContainer>
      </Box>
    </TaxContextProvider>
  )
}
