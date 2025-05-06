import React from 'react'
import cn from 'classnames'
import { Text } from '@/components/Text/Text'
import * as styles from './SubTable.css'

const Label = ({ children }: { children: React.ReactNode }) => (
  <Text variant="h5">{children}</Text>
)
const Value = ({ children }: { children: React.ReactNode }) => (
  <Text>{children}</Text>
)

type labelValue = {
  label: string
  value: string
  useWhiteBackground?: boolean
}

export const SubTable = ({ data }: { data: labelValue[] }) => {
  return (
    <div className={styles.container}>
      {data.map((d) => (
        <div
          key={d.label}
          className={cn(styles.entry, {
            [styles.whiteEntry]: d.useWhiteBackground,
          })}
        >
          <Label>{d.label}</Label>
          <Value>{d.value}</Value>
        </div>
      ))}
    </div>
  )
}

export default SubTable
