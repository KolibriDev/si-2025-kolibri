import { describe, it, expect } from 'vitest'
import { formatISK } from './utils'

describe('formatISK', () => {
  it('formats regular numbers with thousand separators', () => {
    expect(formatISK(1000)).toBe('1.000 kr.')
    expect(formatISK(1500)).toBe('1.500 kr.')
    expect(formatISK(999)).toBe('999 kr.')
  })

  it('formats large numbers correctly', () => {
    expect(formatISK(1000000)).toBe('1.000.000 kr.')
    expect(formatISK(1234567)).toBe('1.234.567 kr.')
  })

  it('handles zero correctly', () => {
    expect(formatISK(0)).toBe('0 kr.')
  })

  it('removes decimal places', () => {
    expect(formatISK(1000.5)).toBe('1.001 kr.')
    expect(formatISK(1000.49)).toBe('1.000 kr.')
  })

  it('formats negative numbers correctly', () => {
    expect(formatISK(-1000)).toBe('-1.000 kr.')
    expect(formatISK(-1234567)).toBe('-1.234.567 kr.')
    expect(formatISK(-999.99)).toBe('-1.000 kr.')
  })
})
