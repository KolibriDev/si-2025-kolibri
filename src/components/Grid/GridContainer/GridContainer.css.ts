import { style } from '@vanilla-extract/css'
import { theme } from '../../Theme/theme'

export const root = style({
  boxSizing: 'border-box',

  maxWidth: theme.breakpoints.xl,

  width: '100%',
  selectors: {
    // Opt out of horizontal padding on nested grids
    ['& &']: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.sm}px)`]: {
      selectors: {
        ['& &']: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    },
    [`screen and (min-width: ${theme.breakpoints.lg}px)`]: {
      selectors: {
        ['& &']: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    },
  },
})
