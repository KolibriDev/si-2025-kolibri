import { forwardRef, MouseEvent } from 'react'
import cn from 'classnames'
import { Button } from '@ariakit/react'

import { Box } from '@/components/Box/Box'
import { Icon } from '@/components/IconRC/Icon'

import * as styles from './IconButton.css'

export type Icon =
  | 'archive'
  | 'accessibility'
  | 'add'
  | 'airplane'
  | 'arrowForward'
  | 'arrowBack'
  | 'arrowUp'
  | 'arrowDown'
  | 'attach'
  | 'business'
  | 'calculator'
  | 'calendar'
  | 'call'
  | 'car'
  | 'cardWithCheckmark'
  | 'caretDown'
  | 'caretUp'
  | 'cellular'
  | 'chatbubble'
  | 'checkmark'
  | 'checkmarkCircle'
  | 'chevronBack'
  | 'chevronUp'
  | 'chevronDown'
  | 'chevronForward'
  | 'closeCircle'
  | 'close'
  | 'copy'
  | 'document'
  | 'documents'
  | 'dots'
  | 'download'
  | 'upload'
  | 'ellipse'
  | 'ellipsisHorizontal'
  | 'ellipsisVertical'
  | 'expand'
  | 'eye'
  | 'eyeOff'
  | 'facebook'
  | 'fileTrayFull'
  | 'fileTrayEmpty'
  | 'filter'
  | 'gavel'
  | 'heart'
  | 'home'
  | 'homeWithCar'
  | 'informationCircle'
  | 'link'
  | 'location'
  | 'lockClosed'
  | 'lockOpened'
  | 'logOut'
  | 'mail'
  | 'mailOpen'
  | 'menu'
  | 'notifications'
  | 'open'
  | 'pencil'
  | 'people'
  | 'person'
  | 'playCircle'
  | 'pause'
  | 'pauseCircle'
  | 'print'
  | 'reader'
  | 'receipt'
  | 'removeCircle'
  | 'school'
  | 'search'
  | 'settings'
  | 'star'
  | 'time'
  | 'timer'
  | 'trash'
  | 'volumeHigh'
  | 'volumeMute'
  | 'wallet'
  | 'warning'
  | 'reload'
  | 'remove'
  | 'save'
  | 'bookmark'
  | 'share'
  | 'QRCode'
  | 'globe'
  | 'signLanguage'
  | 'listView'
  | 'gridView'
  | 'swapHorizontal'
  | 'swapVertical'
  | 'thumbsUp'
  | 'thumbsDown'
  | 'leaf'
  | 'card'
  | 'bank'
  | 'grid'
  | 'list'
  | 'hammer'

interface Props {
  icon: Icon
  colorScheme: 'blue' | 'red' | 'transparent'
  onClick?: (evt: MouseEvent) => void
  disabled?: boolean
}

const IconButton = forwardRef<HTMLButtonElement, Props>(({ ...props }, ref) => {
  const { icon, colorScheme, onClick, disabled } = props

  return (
    <Box
      component={Button}
      ref={ref}
      className={cn(styles.iconButtonContainer, {
        [styles.buttonDisabled]: disabled,
        [styles.transparent]: colorScheme === 'transparent',
      })}
      borderRadius="full"
      background={
        colorScheme === 'blue'
          ? 'blue200'
          : colorScheme === 'red'
            ? 'red200'
            : 'transparent'
      }
      onClick={(evt) => onClick && onClick(evt)}
      disabled={disabled}
      aria-label="Opna valmöguleika fyrir mál"
    >
      <Icon
        icon={icon}
        color={
          colorScheme === 'blue' || colorScheme === 'transparent'
            ? 'blue400'
            : 'red400'
        }
        size="small"
      />
    </Box>
  )
})

export default IconButton
