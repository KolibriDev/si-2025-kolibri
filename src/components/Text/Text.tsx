'use client";'
import { Colors } from '../Theme/theme'
import cn from 'classnames'
import React, { forwardRef } from 'react'
import { Box } from '../Box/Box'
import { ResponsiveSpace } from '../Box/useBoxStyles'
import {
  variantStyles,
  base,
  colors,
  defaultFontWeights,
  defaultLineHeights,
  fontWeight as fontWeightStyles,
  lineHeight as lineHeightStyles,
  TextVariants,
  truncate as truncateStyle,
  strikethrough as strikethroughStyle,
  whiteSpace as whiteSpaceStyle,
  textAlign as textAlignStyle,
  capitalizeFirstLetter as capitalizeFirstLetterStyle,
  disabledText,
} from './Text.css'

type TextElements =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'p'
  | 'span'
  | 'div'
  | 'label'
  | 'caption'
  | 'pre'

export interface TextProps {
  id?: string
  children?: React.ReactNode
  as?: TextElements
  paddingTop?: ResponsiveSpace
  paddingBottom?: ResponsiveSpace
  paddingY?: ResponsiveSpace
  marginTop?: ResponsiveSpace
  marginBottom?: ResponsiveSpace
  marginY?: ResponsiveSpace
  variant?: TextVariants
  color?: Colors
  truncate?: boolean
  fontWeight?: keyof typeof fontWeightStyles
  lineHeight?: keyof typeof lineHeightStyles
  title?: string
  strikethrough?: boolean
  whiteSpace?:
    | 'normal'
    | 'nowrap'
    | 'pre'
    | 'preWrap'
    | 'preLine'
    | 'breakSpaces'
  capitalizeFirstLetter?: boolean
  translate?: 'yes' | 'no'
  textAlign?: 'left' | 'right' | 'center' | 'justify'
  disabled?: boolean
}

type GetTextStylesProps = Pick<
  TextProps,
  | 'variant'
  | 'color'
  | 'truncate'
  | 'fontWeight'
  | 'lineHeight'
  | 'strikethrough'
  | 'whiteSpace'
  | 'textAlign'
  | 'capitalizeFirstLetter'
  | 'disabled'
>

export const getTextStyles = ({
  color,
  truncate,
  fontWeight,
  lineHeight,
  variant = 'default',
  strikethrough,
  whiteSpace,
  textAlign,
  capitalizeFirstLetter,
  disabled,
}: GetTextStylesProps) =>
  cn(base, {
    [variantStyles[variant!]]: variant,
    [colors[color!]]: color,
    [fontWeightStyles[fontWeight!]]: fontWeight,
    [lineHeightStyles[lineHeight!]]: lineHeight,
    [defaultFontWeights[variant!]]: variant && !fontWeight,
    [defaultLineHeights[variant!]]: variant && !lineHeight,
    [truncateStyle]: truncate,
    [strikethroughStyle]: strikethrough,
    [whiteSpaceStyle[whiteSpace!]]: whiteSpace,
    [textAlignStyle[textAlign!]]: textAlign,
    [capitalizeFirstLetterStyle]: capitalizeFirstLetter,
    [disabledText]: disabled,
  })

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      id,
      children,
      color,
      truncate,
      paddingTop,
      paddingBottom,
      paddingY,
      marginTop,
      marginBottom,
      marginY,
      fontWeight,
      lineHeight,
      variant = 'default',
      title,
      as = 'p',
      strikethrough,
      whiteSpace,
      textAlign,
      capitalizeFirstLetter,
      translate,
      disabled,
    },
    ref,
  ) => {
    return (
      <Box
        id={id}
        component={as}
        marginTop={marginTop}
        marginBottom={marginBottom}
        marginY={marginY}
        paddingTop={paddingTop}
        paddingBottom={paddingBottom}
        paddingY={paddingY}
        className={getTextStyles({
          color,
          truncate,
          fontWeight,
          lineHeight,
          variant,
          strikethrough,
          whiteSpace,
          textAlign,
          capitalizeFirstLetter,
        })}
        ref={ref}
        title={title}
        translate={translate}
        disabled={disabled}
      >
        {children}
      </Box>
    )
  },
)
