import { rgb, hex, hsl, isLight } from '@/utils/color'

const color = 'e3342f'

describe('color', () => {
  test('returns the color into RGB notation', () => {
    expect(rgb(color)).toBe('227, 52, 47')
  })
  test('returns the color into hexadecimal notation', () => {
    expect(hex(color)).toBe('#e3342f')
  })
  test('returns the color into HSL notation', () => {
    expect(hsl(color)).toBe('2°, 76%, 54%')
  })
  test('returns true when the color is over 90% lightness', () => {
    expect(isLight('fff')).toBe(true)
  })
  test('returns true when the color is equal to 90% lightness', () => {
    expect(isLight('ffcce8')).toBe(true)
  })
  test('returns false when the color is below 90% lightness', () => {
    expect(isLight('000')).toBe(false)
  })
})
