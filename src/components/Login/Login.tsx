'use client'
import { useState } from 'react'
import * as styles from './Login.css'
import { Input } from '@/components/Input/Input'
import { Button } from '@/components/Button/Button'
import { Text } from '@/components/Text/Text'
import { Logo } from '@/components/Logo/Logo'
import { Checkbox } from '@/components/Checkbox/Checkbox'
import { useRouter } from 'next/navigation'
import { useUserContext } from '../Utils/context/userContext'

export const Login = () => {
  const router = useRouter()
  const [phoneNr, setPhoneNr] = useState<string>('')
  const { fetchNationalRegister, isLoading } = useUserContext()

  const handleLogin = async () => {
    if (phoneNr.length === 7) {
      await fetchNationalRegister(phoneNr)
      router.push('/framtal/nytt/upplysingar')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Logo iconOnly />
      </div>
      <div className={styles.content}>
        <div className={styles.contentUpper}>
          <Text variant="eyebrow" color="blue400" marginBottom={1}>
            Rafræn skilríki í síma
          </Text>
          <div className={styles.titleContainer}>
            <Text variant="h2">Skráðu þig inn</Text>
            <Text variant="h4" fontWeight="light" marginBottom={6}>
              Skattframtal einstaklinga
            </Text>
          </div>
          <div className={styles.loginForm}>
            <Input
              name="login-phonenumber"
              label="Símanúmer"
              backgroundColor="blue"
              placeholder="000-0000"
              maxLength={7}
              onChange={(
                evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
              ) => setPhoneNr(evt.target.value)}
            />
            <Checkbox label={<Text fontWeight="light">Muna símanúmer</Text>} />

            <div className={styles.buttonContainerInner}>
              <Button
                disabled={phoneNr.length !== 7}
                onClick={handleLogin}
                fluid
                loading={isLoading}
              >
                Auðkenna
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.footerContainer}>
          <div className={styles.dividerContainer}>
            <span className={styles.divider} />
            <div className={styles.dividerText}>
              <Text variant="eyebrow" fontWeight="light">
                Eða skráðu þig inn með
              </Text>
            </div>
          </div>
          <span className={styles.footerContainerButton}>
            <Button variant="ghost" fluid>
              <Text variant="h5" color="blue400">
                Auðkennisappinu
              </Text>
            </Button>
            <Button variant="ghost" fluid>
              <Text variant="h5" color="blue400">
                Skilríki á korti
              </Text>
            </Button>
          </span>
        </div>
      </div>
    </div>
  )
}
