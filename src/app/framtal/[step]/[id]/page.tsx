'use client'

import { useParams } from 'next/navigation'

export default function Page() {
  const params = useParams()
  const step = params.step
  const id = params.id

  return (
    <div>
      <h1>Step: {step}</h1>
      <h2>ID: {id}</h2>
    </div>
  )
}
