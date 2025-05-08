import React from 'react'
import Pencil from './icons/Pencil'
import ArrowForward from './icons/ArrowForward'
import Add from './icons/Add'
import FileTrayFull from './icons/FileTrayFull'
import FileTrayFullOutline from './icons/FileTrayFullOutline'
import Attach from './icons/Attach'
import Open from './icons/OpenOutline'
import type { SvgProps } from './types'

const sizes = {
  small: '16px',
  medium: '24px',
  large: '32px',
}

const staticIcons: Record<string, React.FC<SvgProps>> = {
  pencil: Pencil,
  arrowForward: ArrowForward,
  add: Add,
  fileTrayFull: FileTrayFull,
  attach: Attach,
  fileTrayFullOutline: FileTrayFullOutline,
  open: Open,
}

export interface StaticIconProps {
  icon: keyof typeof staticIcons
  size?: 'small' | 'medium' | 'large'
  color?: string
  className?: string
  title?: string
  titleId?: string
  ariaHidden?: boolean
}

export const StaticIcon = ({
  icon,
  size = 'medium',
  color = 'currentColor',
  className,
  title,
  titleId,
  ariaHidden,
}: StaticIconProps) => {
  const IconComponent = staticIcons[icon]

  if (!IconComponent) {
    console.warn(`[StaticIcon] No static icon found for "${icon}"`)
    return null
  }

  return (
    <IconComponent
      width={sizes[size]}
      height={sizes[size]}
      fill={color}
      color={color}
      className={className}
      title={title}
      titleId={titleId}
      aria-hidden={ariaHidden}
    />
  )
}
