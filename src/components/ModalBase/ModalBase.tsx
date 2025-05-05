import React, {
  FC,
  Ref,
  forwardRef,
  useState,
  useLayoutEffect,
  ReactElement,
  useEffect,
} from 'react'
import cn from 'classnames'

import * as styles from './ModalBase.css'
import {
  DisclosureProps,
  DialogProps,
  useDialogStore,
  Dialog,
} from '@ariakit/react'

interface BackdropDivProps {
  backdropWhite?: ModalBaseProps['backdropWhite']
}

export const BackdropDiv = forwardRef(
  (
    { backdropWhite, ...props }: DialogProps & BackdropDivProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const [mounted, setMounted] = useState(false)
    useLayoutEffect(() => {
      setMounted(true)
    }, [])

    return mounted ? (
      <div
        className={cn(
          styles.backdrop,
          styles.backdropColor[backdropWhite ? 'white' : 'default'],
        )}
        {...props}
        ref={ref}
      />
    ) : null
  },
)

export type ModalBaseProps = {
  /**
   * Element that opens the dialog.
   * It will be forwarded necessary props for a11y and event handling.
   */
  disclosure?: ReactElement
  /**
   * Unique ID for accessibility purposes
   */
  baseId: string
  className?: string
  /**
   * Default visibility state
   */
  initialVisibility?: boolean
  /**
   * Setting this to false automatically closes the modal
   */
  toggleClose?: boolean
  /**
   * Optional cb function that is fired when the modal visibility changes
   */
  onVisibilityChange?: (isVisible: boolean) => void
  renderDisclosure?: (
    disclosure: ReactElement,
    disclosureProps?: DisclosureProps,
  ) => ReactElement
  backdropWhite?: boolean
  /**
   * Aria label for the modal
   */
  modalLabel?: string
  /**
   * Remove the modal from dom when closed
   */
  removeOnClose?: boolean
  /**
   * toggle visibility, useful for controlling visibility from useState. Should be used with onVisibilityChange
   */
  isVisible?: boolean
  /**
   * Clicking outside the Dialog closes it unless hideOnClickOutside is set to false.
   */
  hideOnClickOutside?: boolean
  /**
   * When there is no focusable element in the dialog the tabIndex should be set to 0.
   */
  tabIndex?: number
  /**
   * When enabled, the dialog can be closed by pressing Escape. Enabled by default.
   */
  hideOnEsc?: boolean
  /**
   * When enabled, user can't scroll on body when the dialog is visible. This option doesn't work if the dialog isn't modal.
   */
  preventBodyScroll?: boolean

  children?:
    | React.ReactNode
    | ((props: { closeModal: () => void }) => React.ReactNode)
}

export const ModalBase: FC<ModalBaseProps> = ({
  toggleClose,
  children,
  className,
  backdropWhite,
  modalLabel,
  removeOnClose,
  isVisible,
  tabIndex,
  preventBodyScroll,
}) => {
  const modal = useDialogStore({
    animated: true,
  })
  const closeModal = () => modal.hide()

  // If the toggleClose flag has been set to true, we close the modal
  useEffect(() => {
    if (toggleClose) closeModal()
  }, [toggleClose])

  useEffect(() => {
    if (isVisible) {
      modal.show()
    } else if (isVisible === false) {
      modal.hide()
    }
  }, [isVisible])

  const renderModal = !removeOnClose

  return (
    <>
      {renderModal && (
        <BackdropDiv {...modal} backdropWhite={backdropWhite}>
          <Dialog
            {...modal}
            className={cn(styles.modal, className)}
            aria-label={modalLabel}
            tabIndex={tabIndex}
            preventBodyScroll={preventBodyScroll}
          >
            {typeof children === 'function'
              ? children({ closeModal })
              : children}
          </Dialog>
        </BackdropDiv>
      )}
    </>
  )
}
