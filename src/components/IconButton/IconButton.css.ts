import { style } from '@vanilla-extract/css'

import { theme } from '@/components/Theme/theme'

export const iconButtonContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  transition: 'filter .2s, background-color .2s',

  ':hover': {
    filter: 'brightness(0.9)',
  },
})

export const buttonDisabled = style({
  cursor: 'not-allowed',
  opacity: 0.5,

  ':hover': {
    filter: 'brightness(1)',
  },
})

export const transparent = style({
  ':hover': {
    backgroundColor: theme.color.blue100,
    filter: 'brightness(1)',
  },
})
