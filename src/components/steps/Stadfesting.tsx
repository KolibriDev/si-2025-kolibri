'use client'

import React from 'react'
import { Text } from '@/components/Text/Text'
import { AlertMessage } from '../AlertMessage/AlertMessage'
import Image from 'next/image'
import { useWindowSize } from 'react-use'
import { Box } from '../Box/Box'

const Stadfesting = () => {
  const { width } = useWindowSize()
  const dynamicWidth = Math.min(width * 0.4, 337) // adjust 0.5 as needed

  return (
    <div>
      <Box marginBottom={5}>
        <AlertMessage
          title="Framtali skilað"
          message="Framtalið þitt hefur verið sent í vinnslu til Skattsins."
          type="success"
        />
      </Box>
      <Text marginBottom={5}>
        Samkvæmt bráðabirgðaútreikningi ert þú í <strong>inneign</strong>{' '}
        gagnvart Skattinum og færð greiddar <strong>117.244 kr.</strong> þann 1.
        júní nk. Þessi tala er með fyrirvara um endanlega álagningu.
      </Text>
      <Box position="relative" style={{ height: dynamicWidth }}>
        <Image
          src="/success.svg"
          alt=""
          fill
          style={{
            objectFit: 'contain',
          }}
          priority
        />
      </Box>
    </div>
  )
}

export default Stadfesting
