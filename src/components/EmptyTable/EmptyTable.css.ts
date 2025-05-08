import { style } from '@vanilla-extract/css'
import { theme } from '../Theme/theme'

export const emptyTable = style({
  paddingBlock: 16,
  position: 'relative',
  opacity: 0.5,
  display: 'flex',
  justifyContent: 'center',
  selectors: {
    '&::before': {
      content: '',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      height: 1,
      width: '100%',
      zIndex: 0,
      background: theme.color.blue200,
    },
  },
})

export const emptyTableText = style({
  paddingInline: 2,
  position: 'relative',
  textAlign: 'center',
  zIndex: 10,
  background: theme.color.white,
})
