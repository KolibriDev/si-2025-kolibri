import { style } from '@vanilla-extract/css'
import { theme } from '@/components/Theme/theme'

export const tranparentCard = style({
  borderRadius: theme.border.radius.large,
  border: '1px solid transparent',
  borderColor: theme.border.color.blue200,
  padding: `${theme.spacing[3]}px ${theme.spacing[2]}px`,

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md}px)`]: {
      padding: theme.spacing[4],
    },
  },
})

export const inputContainer = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  rowGap: theme.spacing[2],

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md}px)`]: {
      gridTemplateColumns: '1fr 1fr',
      columnGap: theme.spacing[2],
    },
  },
})
