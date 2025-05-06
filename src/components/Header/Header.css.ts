import { style } from '@vanilla-extract/css'

import { theme, themeUtils } from '../Theme/theme'
import { responsiveStyleMap } from '../Utils/responsiveStyleMap'

export const headerContainer = responsiveStyleMap({
  height: { xs: 80, md: 112 },
  padding: { xs: '0 16px', md: '0 48px' },
})

export const verticalLine = style({
  '@media': {
    [`screen and (min-width: ${theme.breakpoints.lg}px)`]: {
      transform: 'rotate(90deg)',
      width: 112,
    },
  },
})

export const infoContainer = style({
  ...themeUtils.responsiveStyle({
    md: {
      borderLeftWidth: '1px',
      borderStyle: 'solid',
      borderColor: theme.color.dark100,
    },
  }),
})

export const infoDescription = style({
  fontWeight: 300,
  lineHeight: 1.5,
  fontSize: 14,
  maxHeight: 40,
  position: 'relative',
  overflow: 'auto',

  ...themeUtils.responsiveStyle({
    md: {
      fontSize: 18,
      maxHeight: 66,
    },
  }),
})

export const userNameContainer = style({
  flex: 1,
  minWidth: 0,
})
