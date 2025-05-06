import { theme } from '@/components/Theme/theme'
import { style } from '@vanilla-extract/css'

export const container = style({
  padding: 0,
})

export const processContainer = style({
  display: 'flex',
  justifyContent: 'center',
  minHeight: 'calc(100vh - 112px)',
  width: '100%',
})

export const formStepperContainer = style({
  position: 'sticky',
})

export const processContent = style({
  minHeight: '644px',
  paddingBottom: theme.spacing[5],

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md}px)`]: {
      borderRadius: theme.border.radius.large,
    },
  },
})

export const name = style({
  whiteSpace: 'nowrap',
  textAlign: 'left',

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md}px)`]: {
      whiteSpace: 'inherit',
    },
  },
})
