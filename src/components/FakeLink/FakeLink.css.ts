import { style } from '@vanilla-extract/css'
import { theme } from '../Theme/theme'

export const fakeLink = style({
  color: theme.color.blue400,
  padding: `4px 0`,
  boxShadow: `inset 0 -1px 0 0 ${theme.color.blue400}`,
})
