'use client'

import Image from 'next/image'
import styles from './page.module.css'
import TestC from '@/components/TestC/TestC'
import { useState } from 'react'
import { GetGreetingsQuery, useGetGreetingsQuery } from '@/generated/graphql'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import TestSayHi from '@/components/TestSayHi/TestSayHi'

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
      <Header userName="asdf" authenticated />
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>src/app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
          <li>{data}</li>
        </ol>

        <TestSayHi />

        <TestC />

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
      </main>
      <Footer />
    </div>
  )
}
