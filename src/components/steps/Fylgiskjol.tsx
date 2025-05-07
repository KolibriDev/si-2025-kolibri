'use client'

import React, { useState } from 'react'
import { Text } from '@/components/Text/Text'
import { Stack } from '../Stack/Stack'
import { InputFileUpload } from '../InputFileUpload/InputFileUpload'

const Fylgiskjol = () => {
  const [files, setFiles] = useState<File[]>([])

  return (
    <Stack space={4}>
      <Text>
        Ef þú vilt leggja fram frekari gögn vegna skattframtalsins er hægt að
        gera það hér.
      </Text>
      <InputFileUpload
        name={'upload'}
        title="Dragðu skjöl hingað til að hlaða upp"
        description="Tekið er við skjölum með endingu: .pdf, .docx, .rtf"
        buttonLabel="Velja skjöl til að hlaða upp"
        files={files}
        onChange={(newFiles) => {
          setFiles((prev) => {
            const uniqueNewFiles = newFiles.filter(
              (newFile) => !prev.some((x) => x.name === newFile.name),
            )
            return [...prev, ...uniqueNewFiles]
          })
        }}
        onRemove={(x) => {
          setFiles((prev) => prev.filter((f) => f.name !== x.name))
        }}
      />
    </Stack>
  )
}

export default Fylgiskjol
