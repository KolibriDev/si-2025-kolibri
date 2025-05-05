import classnames from 'classnames'
import { resolveResponsiveProp, ResponsiveProp } from '../../responsiveProp'
import * as styleRefs from './useNegativeMarginLeft.css'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useNegativeMarginLeft = (space: ResponsiveProp<any>) => {
  const styles = {
    ...styleRefs,
  }

  return classnames(
    resolveResponsiveProp(
      space,
      styles.xs,
      styles.sm,
      styles.md,
      styles.lg,
      styles.xl,
    ),
  )
}
