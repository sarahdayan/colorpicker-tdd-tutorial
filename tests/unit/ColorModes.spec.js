import { rgb, hex, hsl } from '@/utils/ColorModes'

const color = 'e3342f'

describe('ColorModes', () => {
  test('returns the color into RGB notation', () => {
    expect(rgb(color)).toBe('227, 52, 47')
  })
  test('returns the color into hexadecimal notation', () => {
    expect(hex(color)).toBe('#e3342f')
  })
  test('returns the color into HSL notation', () => {
    expect(hsl(color)).toBe('2°, 76%, 54%')
  })
})
