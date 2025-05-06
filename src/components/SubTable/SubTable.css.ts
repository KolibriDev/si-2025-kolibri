import { style } from '@vanilla-extract/css'

export const container = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  columnGap: '16px',
})

export const entry = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  padding: '16px 16px',
})

export const whiteEntry = style({
  backgroundColor: 'white',
})
