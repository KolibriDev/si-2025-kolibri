'use client'

import React from 'react'
import { Text } from '@/components/Text/Text'
import { Box } from '../Box/Box'
import * as T from '@/components/Table/Table'
import { Button } from '../Button/Button'
import { formatISK } from '@/lib/utils'
import { useTaxContext } from '../Utils/context/taxContext'
import { InputFileUpload, UploadFile } from '../InputFileUpload/InputFileUpload'

const Fradrattur = () => {
  const { taxReturn } = useTaxContext()
  const deductions = taxReturn?.deductions

  return (
    <div>
      <Text marginBottom={2}>
        Starfstengd hlunnindi, t.d. dagpeningar og ökutækjastyrkur, eru
        skattfrjáls upp að vissu marki. Í flestum tilfellum sendir
        launagreiðandi gögn til Skattsins sem endurspegla þetta.
      </Text>
      <Text marginBottom={6}>
        Ef þú fékkst náms- eða vísindastyrk og vilt færa kostnað á móti til að
        greiða ekki skatt af styrknum þá þarftu að skrá kostnaðinn hér og skila
        inn fylgiskjölum.
      </Text>
      {deductions && (
        <>
          <Box marginBottom={3}>
            <T.Table>
              <T.Head>
                <T.Row>
                  <T.HeadData>{/* empty */}</T.HeadData>
                  <T.HeadData>{'Tegund frádráttar'}</T.HeadData>
                  <T.HeadData align="right">{'Upphæð'}</T.HeadData>
                </T.Row>
              </T.Head>
              <T.Body>
                {deductions.map((deduction) => (
                  <T.Row key={deduction.deductionType}>
                    <T.Data>
                      <Button
                        circle
                        colorScheme="negative"
                        title="Breyta"
                        type="icon"
                        icon={'pencil'}
                        onClick={() => {}}
                      />
                    </T.Data>
                    <T.Data align="right">{formatISK(deduction.amount)}</T.Data>
                  </T.Row>
                ))}
              </T.Body>
              <T.Foot>
                <T.Row>
                  <T.Data text={{ fontWeight: 'bold' }}>Samtals:</T.Data>
                  <T.Data>{/* empty */}</T.Data>
                  <T.Data>{/* empty */}</T.Data>
                  <T.Data text={{ fontWeight: 'bold' }} align="right">
                    {formatISK(
                      // TODO: FIX ! below
                      deductions.reduce((v, a) => v + a.amount! || 0, 0),
                    )}
                  </T.Data>
                </T.Row>
              </T.Foot>
            </T.Table>
          </Box>
          <Button variant="ghost" size="small" icon="add" onClick={() => {}}>
            Bæta við
          </Button>
        </>
      )}
      <Text variant="h3" as="h2">
        Fylgiskjöl
      </Text>
      <Text marginBottom={2}>
        Hér vantar texta sem útskýrir að ef viðkomandi þarf að láta fylgja með
        gögn þá sé hægt að hlaða þeim upp hér.
      </Text>
      <InputFileUpload
        name={'upload'}
        title="Dragðu skjöl hingað til að hlaða upp"
        description="Tekið er við skjölum með endingu: .pdf, .docx, .rtf"
        buttonLabel="Velja skjöl til að hlaða upp"
        files={[]}
        onRemove={function (file: UploadFile): void {
          throw new Error('Function not implemented.')
        }}
      />
    </div>
  )
}

export default Fradrattur
