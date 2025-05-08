'use client'
import cn from 'classnames'
import { Box } from '@/components/Box/Box'
import * as styles from './layout.css'
import { useParams } from 'next/navigation'
import { findPageHeaderByStep } from '../../routeSections'
import { Text } from '@/components/Text/Text'
import { StepsFooter } from '@/components/steps/StepsFooter/StepsFooter'
import { useState } from 'react'
import { useKey } from 'react-use'
import Image from 'next/image'
import { AlertMessage } from '@/components/AlertMessage/AlertMessage'

export default function StepLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [showError, setShowError] = useState<boolean>(false)
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false)
  const params = useParams()

  const step = params?.step as string | undefined
  if (!step) {
    return null
  }
  useKey('e', () => {
    if (step === 'gagnaoflun') {
      setShowError((prev) => !prev)
    }
  })

  useKey('b', () => {
    if (step === 'gagnaoflun') {
      setShowErrorMessage((prev) => !prev)
    }
  })

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
        {showErrorMessage && (
          <Box marginBottom={2}>
            <AlertMessage
              title="Villa"
              message="Ekki tókst að sækja gögn frá Skattinum. Reyndu aftur síðar."
              type="error"
            />
          </Box>
        )}
        <Text variant="h2" as="h1">
          {headerText}
        </Text>
        <div className={styles.content}>{children}</div>
      </Box>
      <div className={styles.footerContainer}>
        <StepsFooter />
      </div>
      <span
        className={cn(styles.a, {
          [styles.b]: showError,
        })}
      >
        <Image
          src="/AlertToast.svg"
          alt="Villa"
          width={432}
          height={120}
          priority
        />
      </span>
    </div>
  )
}
