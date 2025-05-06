'use client'

import { FC, useState } from 'react'
import { Box } from '../Box/Box'
import { Text } from '../Text/Text'
import { Input } from '../Input/Input'
import { Button } from '../Button/Button'
import { useMutation, gql } from '@apollo/client'

const SAY_HI = gql(/* GraphQL */ `
  mutation SayHi($name: String!) {
    sayHi(name: $name)
  }
`)

const TestSayHi: FC = () => {
  const [name, setName] = useState('')
  const [greeting, setGreeting] = useState('')
  const [sayHi] = useMutation(SAY_HI)

  const handleSubmit = async () => {
    try {
      const { data } = await sayHi({
        variables: { name },
      })
      if (data?.sayHi) {
        setGreeting(data.sayHi)
      }
    } catch (error) {
      console.error('Error submitting name:', error)
    }
  }

  return (
    <Box>
      <h1>Say Hi</h1>
      <Input
        name="name"
        label="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
      {greeting && <Text>{greeting}</Text>}
    </Box>
  )
}

export default TestSayHi
