import { style } from '@vanilla-extract/css'
import { theme } from '@/components/Theme/theme'

export const inputContainer = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: theme.spacing[2],
})

export const requiredStar = style({
  color: theme.color.red400,
})
