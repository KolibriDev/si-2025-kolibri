import { style } from '@vanilla-extract/css'

export const stepLayout = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1px',
})

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  minHeight: '576px',
})

export const content = style({
  flex: 1,
})
