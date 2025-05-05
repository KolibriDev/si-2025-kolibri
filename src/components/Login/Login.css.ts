import { style } from '@vanilla-extract/css'
import { theme } from '../Theme/theme'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
})

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: `1px solid ${theme.color.blue200}`,
  borderRadius: '8px',
  padding: '32px',
  gap: '32px',
  width: '100%',

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md}px)`]: {
      width: '460px',
      padding: '32px',
    },
  },
})

export const contentUpper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '24px',
  width: '100%',
})

export const logoContainer = style({
  marginBottom: '-20px',
  padding: '0 16px',
  zIndex: 1,
  background: 'white',
})

export const titleContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  rowGap: '8px',
})

export const loginForm = style({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '24px',
  width: '100%',
})

export const buttonContainer = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '32px',
})

export const buttonContainerInner = style({
  minWidth: '204px',
})

export const footerContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  rowGap: '24px',
  borderBottomLeftRadius: '8px',
  borderBottomRightRadius: '8px',
})

export const dividerContainer = style({
  position: 'relative',
  textAlign: 'center',
  width: '100%',
})

export const dividerText = style({
  display: 'inline-block',
  zIndex: 1,
  backgroundColor: 'white',
  padding: '0 16px',
})

export const divider = style({
  position: 'absolute',
  top: 'calc(50% + 1px)',
  left: '0',
  right: '0',
  height: '1px',
  width: '100%',
  backgroundColor: '#ccdfff',
  zIndex: '-1',
})

export const footerContainerButton = style({
  borderRadius: '8px',
  backgroundColor: 'white',
  marginBottom: '24px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  rowGap: '16px',
})
