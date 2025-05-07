'use client'

import React from 'react'
import { Text } from '@/components/Text/Text'
import { Stack } from '../Stack/Stack'
import { InputFileUpload, UploadFile } from '../InputFileUpload/InputFileUpload'
import { useTaxContext } from '../Utils/context/taxContext'
import { TaxReturnQuery } from '@/generated/graphql'

type Attachment = NonNullable<
  NonNullable<TaxReturnQuery['taxReturn']>['attachments']
>[number]

const Fylgiskjol = () => {
  const { taxReturn, updateTaxReturn } = useTaxContext()
  const files = taxReturn?.attachments || []

  if (!taxReturn) {
    return <Text>Gögn vantar</Text>
  }

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
        files={files as UploadFile[]}
        onChange={(newFiles) => {
          const currentFiles = taxReturn?.attachments || []
          const uniqueNewFiles: Attachment[] = newFiles
            .filter(
              (newFile) => !currentFiles.some((x) => x.name === newFile.name),
            )
            .map((x) => ({
              __typename: 'Attachment',
              name: x.name,
              size: x.size,
              fileType: x.type,
            }))

          updateTaxReturn({
            ...taxReturn,
            attachments: [...currentFiles, ...uniqueNewFiles],
          })
        }}
        onRemove={(x) => {
          const currentFiles = taxReturn?.attachments || []
          updateTaxReturn({
            ...taxReturn,
            attachments: currentFiles.filter((f) => f.name !== x.name),
          })
        }}
      />
    </Stack>
  )
}

export default Fylgiskjol
