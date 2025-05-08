import { Box } from '../Box/Box'
import { BoxProps } from '../Box/types'
import LoadingDots from '../LoadingDots/LoadingDots'
import { Text } from '../Text/Text'
import * as styles from './EmptyTable.css'

type Props = {
  message?: React.ReactNode
  loading?: boolean
  background?: BoxProps['background']
}

export const EmptyTable: React.FC<Props> = ({
  message,
  loading,
  background,
}) => {
  return (
    <Box className={styles.emptyTable} background={background}>
      <Box className={styles.emptyTableText}>
        {loading && <LoadingDots />}
        {!loading && message && (
          <Text color="dark400" variant="default">
            {message}
          </Text>
        )}
      </Box>
    </Box>
  )
}
