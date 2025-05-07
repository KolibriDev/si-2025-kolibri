import { describe, it, expect } from 'vitest'
import { formatISK, formatNationalId } from './utils'

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

describe('formatNationalId', () => {
  it('formats valid national IDs with a hyphen', () => {
    expect(formatNationalId('1234567890')).toBe('123456-7890')
    expect(formatNationalId('0101902999')).toBe('010190-2999')
  })

  it('handles already formatted national IDs', () => {
    expect(formatNationalId('123456-7890')).toBe('123456-7890')
  })

  it('returns empty string for null or undefined input', () => {
    expect(formatNationalId(null)).toBe('')
    expect(formatNationalId(undefined)).toBe('')
  })

  it('returns original value for invalid length inputs', () => {
    expect(formatNationalId('123')).toBe('123')
    expect(formatNationalId('12345678901')).toBe('12345678901')
  })

  it('removes non-digit characters before formatting', () => {
    expect(formatNationalId('123456-7890')).toBe('123456-7890')
    expect(formatNationalId('123.456.7890')).toBe('123456-7890')
    expect(formatNationalId('123 456 7890')).toBe('123456-7890')
  })
})
