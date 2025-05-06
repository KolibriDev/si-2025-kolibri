import { FC } from 'react'
import Image from 'next/image'
import { Box } from '../Box/Box'
import { Text } from '../Text/Text'

const CompanyLogo: FC = () => {
  return (
    <>
      <Image
        src="/logo.svg"
        alt="Logo skattsins"
        width={80}
        height={80}
        priority
      />
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Text variant="eyebrow" color="purple600">
          Þjónustuaðili
        </Text>
        <Text variant="h4" color="purple600">
          Skatturinn
        </Text>
      </Box>
    </>
  )
}

export default CompanyLogo
