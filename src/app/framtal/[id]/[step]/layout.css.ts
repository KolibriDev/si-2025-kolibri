import { style } from '@vanilla-extract/css'
import { theme } from '@/components/Theme/theme'

export const stepLayout = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1px',
})

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  borderTopRightRadius: theme.border.radius.large,
  borderTopLeftRadius: theme.border.radius.large,
  // 100% - header - paddingTop - paddingBottom - footer - 2px buffer
  height: 'calc(100vh - 112px - 48px - 48px - 144px - 2px)',
  overflow: 'scroll',
})

export const content = style({
  flex: 1,
})

export const footerContainer = style({
  background: 'white',
  padding: theme.spacing[3],
  borderBottomRightRadius: theme.border.radius.large,
  borderBottomLeftRadius: theme.border.radius.large,

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.lg}px)`]: {
      padding: `${theme.spacing[5]}px ${theme.spacing[14]}px`,
    },
  },
})
