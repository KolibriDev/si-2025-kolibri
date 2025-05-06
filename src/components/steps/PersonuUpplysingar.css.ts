import { style } from '@vanilla-extract/css'
import { theme } from '@/components/Theme/theme'

export const tranparentCard = style({
  borderRadius: theme.border.radius.large,
  padding: theme.spacing[4],
  border: '1px solid transparent',
  borderColor: theme.border.color.blue200,
})

export const inputContainer = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  columnGap: theme.spacing[2],
})
