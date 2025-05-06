import { style } from '@vanilla-extract/css'
import { theme } from '../Theme/theme'

export const inputContainer = style({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr 3fr',
  gap: theme.spacing[2],
})
