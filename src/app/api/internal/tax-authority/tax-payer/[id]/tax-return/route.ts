import { NextRequest, NextResponse } from 'next/server'
// TODO: Add endpoints for tax returns
export async function GET(req: NextRequest) {
  console.log(req)
  return NextResponse.json({ message: 'Hello from tax-return endpoint!' })
}
