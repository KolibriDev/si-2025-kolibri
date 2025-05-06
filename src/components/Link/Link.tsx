import * as React from 'react'
import cn from 'classnames'
import { LinkProps as NextLinkProps } from 'next/link'

import * as styles from './Link.css'

export type LinkColor = 'white' | 'blue400' | 'blue600'
export type UnderlineVisibility = 'always' | 'hover'
export type UnderlineVariants = 'normal' | 'small'

export interface LinkProps extends NextLinkProps {
  color?: LinkColor
  dataTestId?: string
  className?: string
  underline?: UnderlineVariants
  underlineVisibility?: UnderlineVisibility
  skipTab?: boolean
  pureChildren?: boolean
  newTab?: boolean
  onClick?: () => void
}

// Next link that can handle external urls
export const Link: React.FC<React.PropsWithChildren<LinkProps>> = ({
  children,
  href,
  color,
  skipTab,
  className,
  underline,
  underlineVisibility = 'hover',
  newTab = false,
  dataTestId = undefined,
  ...linkProps
}) => {
  const classNames = cn(
    styles.link,
    color ? styles.colors[color] : undefined,
    underline ? styles.underlines[underline] : undefined,
    underline && underlineVisibility
      ? styles.underlineVisibilities[underlineVisibility]
      : undefined,
    className,
  )
  const hrefString = href?.toString()

  return (
    <a
      className={classNames}
      data-testid={dataTestId}
      href={hrefString}
      {...linkProps}
      {...(newTab && { target: '_blank' })}
      tabIndex={skipTab ? -1 : undefined}
    >
      {children}
    </a>
  )
}
