import { FC, PropsWithChildren } from 'react'
import * as styles from './FakeLink.css'

const FakeLink: FC<PropsWithChildren> = (props) => {
  const { children } = props
  return <span className={styles.fakeLink}>{children}</span>
}

export default FakeLink
