'use client'
import { Box } from '@/components/Box/Box'
import * as styles from './layout.css'
import { useParams } from 'next/navigation'
import { findPageHeaderByStep } from '../../routeSections'
import { Text } from '@/components/Text/Text'
import { StepsFooter } from '@/components/steps/StepsFooter/StepsFooter'

export default function StepLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const params = useParams()
  const step = params?.step as string | undefined
  if (!step) {
    return null
  }
  const headerText = findPageHeaderByStep(step)

  return (
    <div className={styles.stepLayout}>
      <Box
        background="white"
        borderColor="white"
        paddingY={[3, 3, 10, 10]}
        paddingX={[3, 3, 14, 14]}
        className={styles.container}
      >
        <Text variant="h2" as="h1">
          {headerText}
        </Text>
        <div className={styles.content}>{children}</div>
      </Box>
      <Box
        borderColor="white"
        background="white"
        paddingY={[3, 3, 5, 5]}
        paddingX={[3, 3, 14, 14]}
      >
        <StepsFooter />
      </Box>
    </div>
  )
}
