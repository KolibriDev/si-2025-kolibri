import React, { ReactElement, ReactNode } from 'react'

import { Logo } from '../Logo/Logo'
import { Box } from '../Box/Box'
import { Text } from '../Text/Text'
import { Hidden } from '../Hidden/Hidden'
import { UserMenu } from './UserMenu/UserMenu'
import * as styles from './Header.css'
import { Divider } from '../Divider/Divider'

export interface HeaderProps {
  info?: {
    title: string
    description?: string
  }
  logoRender?: (ReactElement: ReactElement) => ReactElement
  logoutText?: string
  headerItems?: ReactNode
  /**
   * @deprecated please pass in a UserMenu or other header items with `headerItems`
   */
  authenticated?: boolean
  /**
   * @deprecated please pass in a UserMenu or other header items with `headerItems`
   */
  onLogout?: () => void
  /**
   * @deprecated please pass in a UserMenu or other header items with `headerItems`
   */
  switchLanguage?: () => void
  /**
   * @deprecated please pass in a UserMenu or other header items with `headerItems`
   */
  userLogo?: string
  /**
   * @deprecated please pass in a UserMenu or other header items with `headerItems`
   */
  userName?: string
  /**
   * @deprecated please pass in a UserMenu or other header items with `headerItems`
   */
  userAsDropdown?: boolean
  /**
   * @deprecated please pass in a UserMenu or other header items with `headerItems`
   */
  dropdownItems?: ReactNode
  /**
   * @deprecated please pass in a UserMenu or other header items with `headerItems`
   */
  language?: string
}

const LogoIcon = (
  <>
    <Hidden above="sm">
      <Logo width={40} iconOnly />
    </Hidden>
    <Hidden below="md">
      <Logo width={160} />
    </Hidden>
  </>
)

export const Header = ({
  authenticated,
  language,
  logoRender,
  onLogout,
  switchLanguage,
  userName = '',
  dropdownItems,
  info,
  headerItems,
}: HeaderProps) => {
  const renderLogo = () => {
    if (logoRender) {
      return logoRender(LogoIcon)
    }

    return LogoIcon
  }

  const renderInfo = () => {
    if (!info) {
      return null
    }

    return (
      <Box
        display="flex"
        className={styles.infoContainer}
        alignItems="center"
        height="full"
        marginLeft={[1, 1, 2, 4]}
        marginRight="auto"
        paddingRight={[1, 1, 2, 4]}
      >
        <Box marginLeft={[1, 1, 2, 4]}>
          <Text variant="eyebrow">{info.title}</Text>
          {info.description && (
            <p className={styles.infoDescription}>{info.description}</p>
          )}
        </Box>
      </Box>
    )
  }

  const renderOldDropdown = () => {
    if (!userName) {
      return null
    }

    return (
      <UserMenu
        authenticated={authenticated}
        username={userName}
        language={language}
        dropdownItems={dropdownItems}
        switchLanguage={switchLanguage}
        onLogout={onLogout}
      />
    )
  }

  return (
    <Box
      className={styles.headerContainer}
      paddingX={[2, 2, 2, 6]}
      width="full"
      display="flex"
      alignItems="center"
      justifyContent="spaceBetween"
    >
      <Box display="flex" columnGap={2} alignItems="center" flexWrap="nowrap">
        <Box display="flex" alignItems="center">
          <Box flexShrink={0} paddingRight={0}>
            {renderLogo()}
          </Box>
          <div className={styles.verticalLine}>
            <Divider thickness="thick" weight="purple100" />
          </div>
          <Hidden
            below="lg"
            children={
              <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
                paddingLeft={0}
                paddingRight={2}
              >
                <Text variant="eyebrow">Skatturinn</Text>
                <Text fontWeight="semiBold">Skattframtal einstaklinga</Text>
              </Box>
            }
          />
        </Box>
        {renderInfo()}
      </Box>
      <Box display="flex" alignItems="center" columnGap={2} flexShrink={0}>
        {renderOldDropdown()}
        {headerItems}
      </Box>
    </Box>
  )
}
