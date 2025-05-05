import classnames from 'classnames'
import { resolveResponsiveProp, ResponsiveProp } from '../../responsiveProp'
import * as styleRefs from './useNegativeMarginTop.css'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useNegativeMarginTop = (space: ResponsiveProp<any>) => {
  const styles = {
    ...styleRefs,
  }

  const negativeMarginTop = resolveResponsiveProp(
    space,
    styles.xs,
    styles.sm,
    styles.md,
    styles.lg,
    styles.xl,
  )
  return classnames(styles.base, negativeMarginTop)
}
