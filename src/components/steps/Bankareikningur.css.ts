import { style } from '@vanilla-extract/css'
import { theme } from '../Theme/theme'

export const inputContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing[2],

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.xl}px)`]: {
      flexDirection: 'row',
    },
  },
})

export const bankAndHBContainer = style({
  display: 'grid',
  gridTemplateColumns: '3fr 1fr',
  gap: theme.spacing[2],

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md}px)`]: {
      gridTemplateColumns: '2fr 1fr',
    },
  },
})

export const rn = style({
  minWidth: '60%',
})
