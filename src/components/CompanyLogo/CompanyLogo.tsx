import { FC } from 'react'
import Image from 'next/image'
import { Box } from '../Box/Box'
import { Text } from '../Text/Text'
import { Button } from '../Button/Button'
import { Hidden } from '../Hidden/Hidden'

interface Props {
  href?: string
}

const CompanyLogo: FC<Props> = (props) => {
  const { href } = props

  const renderCompanyName = () => {
    return href ? (
      <Button variant="text" icon="arrowForward">
        Skatturinn
      </Button>
    ) : (
      <Text variant="h4" color="purple600">
        Skatturinn
      </Text>
    )
  }
  return (
    <Box
      display="flex"
      background="purple100"
      columnGap={2}
      padding={4}
      borderRadius="large"
      alignItems="center"
    >
      <Image
        src="/logo.svg"
        alt="Logo skattsins"
        width={80}
        height={80}
        priority
      />
      <Hidden below="lg">
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Text variant="eyebrow" color="purple600">
            Þjónustuaðili
          </Text>
          {renderCompanyName()}
        </Box>
      </Hidden>
    </Box>
  )
}

export default CompanyLogo
