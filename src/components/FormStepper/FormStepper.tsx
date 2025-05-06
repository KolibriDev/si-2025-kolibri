import React, { FC, ReactElement } from 'react'

import { Box } from '@/components/Box/Box'
import * as styles from './FormStepper.css'

export const FormStepper: FC<
  React.PropsWithChildren<{
    sections?: ReactElement[]
  }>
> = ({ sections }) => {
  return (
    <Box width="full">
      {sections ? <Box className={styles.list}>{sections}</Box> : null}
    </Box>
  )
}

export default FormStepper
