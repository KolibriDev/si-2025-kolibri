import { style } from '@vanilla-extract/css'
import { theme } from '@/components/Theme/theme'

export const withDecorator = style({
  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md}px)`]: {
      borderRight: `1px solid ${theme.color.blue200}`,
    },
  },
})

export const iconPaddingTop = style({
  paddingTop: '3px',
})
