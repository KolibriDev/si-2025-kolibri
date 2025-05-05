import { Box } from '@/components/Box/Box'
import * as styles from './layout.css'
import { GridContainer } from '@/components/Grid/GridContainer/GridContainer'
import { GridRow } from '@/components/Grid/GridRow/GridRow'
import { GridColumn } from '@/components/Grid/GridColumn/GridColumn'

const SidePanel: FC<SidePanelProps> = ({
  user,
  isValid,
  onNavigationTo,
  workingCase,
}) => {
  const { getSections } = useSections(isValid, onNavigationTo)
  const sections = getSections(workingCase, user)
  const { formatMessage } = useIntl()
  const activeSection = sections.findIndex((s) => s.isActive)
  const activeSubSection = sections[activeSection]?.children.findIndex(
    (s) => s.isActive,
  )
  return (
    <GridColumn span={['12/12', '12/12', '4/12', '3/12']}>
      <div className={styles.formStepperContainer}>
        <Box marginLeft={[0, 0, 2]}>
          {!isDefenceUser(user) && (
            <Box marginBottom={7} display={['none', 'none', 'block']}>
              <Logo defaultInstitution={workingCase.court?.name} />
            </Box>
          )}
          <Box marginBottom={6}>
            <Text variant="h3" as="h3">
              {formatMessage(
                user?.institution?.type === InstitutionType.COURT_OF_APPEALS
                  ? formStepperSections.appealedCaseTitle
                  : isIndictmentCase(workingCase.type)
                    ? formStepperSections.indictmentTitle
                    : formStepperSections.title,
                { caseType: workingCase.type },
              )}
            </Text>
          </Box>
          <FormStepperV2
            sections={sections.map((section, index) => (
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
          <SidePanel
            user={user}
            isValid={isValid}
            onNavigationTo={onNavigationTo}
            workingCase={workingCase}
          />
        </GridRow>
      </GridContainer>
    </Box>
  )
}
