import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const secret = request.headers.get('x-internal-secret')
  if (secret !== process.env.INTERNAL_API_SECRET) {
    return new Response('Unauthorized', { status: 401 })
  }
  return NextResponse.json({ message: 'Hello from national registry' })
}
