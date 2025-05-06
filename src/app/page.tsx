'use client'

import Image from 'next/image'
import styles from './page.module.css'
import TestC from '@/components/TestC/TestC'
import { useState } from 'react'
import { GetGreetingsQuery, useGetGreetingsQuery } from '@/generated/graphql'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { Box } from '@/components/Box/Box'
import { GridContainer } from '@/components/Grid/GridContainer/GridContainer'
import { GridColumn } from '@/components/Grid/GridColumn/GridColumn'
import { GridRow } from '@/components/Grid/GridRow/GridRow'
import { Text } from '@/components/Text/Text'
import { Button } from '@/components/Button/Button'
import CompanyLogo from '@/components/CompanyLogo/CompanyLogo'
import TableOfContents from '@/components/TableOfContents/TableOfContents'

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

  return (
    <div className={styles.page}>
      <Box paddingX={6}>
        <Header userName="Jökull Þórðarson" authenticated />
      </Box>
      <main className={styles.main}>
        <div className={styles.grid}>
          <div>
            <Box marginBottom={3}>
              <Button variant="text" size="small" preTextIcon="arrowBack">
                Fjármál og skattar
              </Button>
            </Box>
            <Box
              display="flex"
              background="purple100"
              columnGap={2}
              padding={4}
              marginBottom={3}
              borderRadius="large"
            >
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
          </div>
          <p>snkdjfsjkdnfkjsdn fkjsnds sdf sdf </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
