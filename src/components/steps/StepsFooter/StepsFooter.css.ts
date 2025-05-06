import { style } from '@vanilla-extract/css'
export const footer = style({
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
  textAlign: 'center',
})

export const primaryButton = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
})
