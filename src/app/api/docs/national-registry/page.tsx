'use client'

import { RedocStandalone } from 'redoc'

export default function ApiDocsPage() {
  return (
    <RedocStandalone
      specUrl="/national-registry.openapi.json"
      options={{
        nativeScrollbars: true,
        theme: { colors: { primary: { main: '#0066cc' } } },
      }}
    />
  )
}
