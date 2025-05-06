import { style } from '@vanilla-extract/css'
import { theme } from '../Theme/theme'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  background: theme.color.blue100,
  columnGap: theme.spacing[2],
  marginBottom: theme.spacing[3],
  borderRadius: theme.border.radius.large,
})

export const title = style({
  padding: `${theme.spacing[3]}px ${theme.spacing[4]}px`,
  color: theme.color.purple600,
  borderBottom: `1px solid ${theme.color.blue200}`,
})

export const itemsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing[2],
  padding: `${theme.spacing[3]}px ${theme.spacing[4]}px`,
  listStyle: 'none',
})

export const item = style({})
