import { FC } from 'react'
import { Text } from '../Text/Text'
import * as styles from './TableOfContents.css'

const TableOfContents: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Text variant="h4" color="blue600">
          Efnisyfirlit
        </Text>
      </div>
      <ul className={styles.itemsContainer}>
        <li>
          <Text color="blue400" variant="h5">
            Skattframtal einstaklinga
          </Text>
        </li>
        <li>
          <Text color="blue600">Ítarlegar leiðbeiningar</Text>
        </li>
        <li>
          <Text color="blue600">Álagning og forsendur hennar</Text>
        </li>
        <li>
          <Text color="blue600">Eftir skil á framtali</Text>
        </li>
      </ul>
    </div>
  )
}

export default TableOfContents
