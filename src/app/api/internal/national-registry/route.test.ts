import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GET } from './route'
import { NextRequest } from 'next/server'

const mockSql = vi.fn()

vi.mock('postgres', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sql = (...args: any[]) => mockSql(...args)

  return {
    __esModule: true,
    default: vi.fn(() => sql),
  }
})

// Helper to build request
const makeRequest = (
  params: Record<string, string>,
  headers: Record<string, string> = {},
) =>
  new NextRequest(
    new URL(`http://localhost/api?${new URLSearchParams(params)}`),
    {
      headers: new Headers(headers),
    },
  )

vi.stubEnv('INTERNAL_API_SECRET', 'test-secret')
vi.stubEnv('POSTGRES_URL', 'postgres://fake-url')

describe('GET handler', () => {
  beforeEach(() => {
    mockSql.mockReset()
  })

  it('returns 401 for missing secret', async () => {
    const req = makeRequest({ national_id: '1234567890' })
    const res = await GET(req)
    expect(res.status).toBe(401)
  })

  it('returns 400 for invalid national_id', async () => {
    const req = makeRequest(
      { invalid: 'sibbi' },
      { 'x-internal-secret': 'test-secret' },
    )
    const res = await GET(req)
    expect(res.status).toBe(400)
  })

  it('returns 200 for valid request', async () => {
    mockSql.mockResolvedValueOnce([
      { national_id: '1234567890', name: 'Alice' },
    ])
    const req = makeRequest(
      { national_id: '1234567890' },
      { 'x-internal-secret': 'test-secret' },
    )
    const res = await GET(req)
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data).toEqual([{ national_id: '1234567890', name: 'Alice' }])
  })

  it('returns 500 if DB throws', async () => {
    mockSql.mockRejectedValueOnce(new Error('db failed'))
    const req = makeRequest(
      { national_id: '1234567890' },
      { 'x-internal-secret': 'test-secret' },
    )
    const res = await GET(req)
    expect(res.status).toBe(500)
  })
})
