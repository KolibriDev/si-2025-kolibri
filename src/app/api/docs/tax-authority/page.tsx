'use client'

import { RedocStandalone } from 'redoc'

export default function ApiDocsPage() {
  return (
    <RedocStandalone
      specUrl="/tax-authority.openapi.json"
      options={{
        nativeScrollbars: true,
        theme: { colors: { primary: { main: '#0066cc' } } },
      }}
    />
  )
}
