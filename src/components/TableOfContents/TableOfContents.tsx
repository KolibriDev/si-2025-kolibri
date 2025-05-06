import { FC } from 'react'
import { Text } from '../Text/Text'
import * as styles from './TableOfContents.css'
import { IconMapIcon } from '../IconRC/types'
import { Icon } from '../IconRC/Icon'

interface Props {
  title: string
  items: string[]
  titleIcon?: IconMapIcon
}

const TableOfContents: FC<Props> = (props) => {
  const { title, items, titleIcon } = props

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {titleIcon && <Icon icon={titleIcon} color="blue600" type="outline" />}
        <Text variant="h4" color="blue600">
          {title}
        </Text>
      </div>
      <ul className={styles.itemsContainer}>
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>
            <Text
              color={index === 0 ? 'blue400' : 'blue600'}
              variant={index === 0 ? 'h5' : 'default'}
            >
              {item}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TableOfContents
