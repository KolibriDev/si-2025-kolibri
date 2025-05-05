'use client'

import { FC } from 'react'
import { Text } from '../Text/Text'
import { Input } from '../Input/Input'
import { Button } from '../Button/Button'
import { Select } from '../Select/Select'

const TestC: FC = () => {
  return (
    <div>
      <h1>TestC</h1>
      <Text variant="h2" as="h5" color="red200">
        This is TestC component.
      </Text>
      <Input name="asd" label="asd" tooltip="sdf" />
      <Button
        variant="primary"
        onClick={() => {
          console.log('Button clicked')
        }}
      >
        Click Me
      </Button>
      <Select label="sdf" />
    </div>
  )
}

export default TestC
