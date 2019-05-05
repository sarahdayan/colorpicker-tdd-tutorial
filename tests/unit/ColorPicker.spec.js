import { shallowMount } from '@vue/test-utils'
import ColorPicker from '@/components/ColorPicker'
import convert from 'color-convert'

let wrapper = null

const propsData = {
  swatches: ['e3342f', '3490dc', 'f6993f', '38c172', 'fff']
}

beforeEach(() => (wrapper = shallowMount(ColorPicker, { propsData })))
afterEach(() => wrapper.destroy())

describe('ColorPicker', () => {
  describe('Swatches', () => {
    test('displays each color as an individual swatch', () => {
      const swatches = wrapper.findAll('.swatch')
      propsData.swatches.forEach((swatch, index) => {
        expect(swatches.at(index).attributes().style).toBe(
          `background: rgb(${convert.hex.rgb(swatch).join(', ')})`
        )
      })
    })
    test('sets the first swatch as the selected one by default', () => {
      const firstSwatch = wrapper.find('.swatch')
      expect(firstSwatch.classes()).toContain('active')
    })
    test('makes the swatch active when clicked', () => {
      const targetSwatch = wrapper.findAll('.swatch').at(2)
      targetSwatch.trigger('click')
      expect(targetSwatch.classes()).toContain('active')
    })
    test('sets the swatch as light when color is light', () => {
      const targetSwatch = wrapper.findAll('.swatch').at(4)
      expect(targetSwatch.classes()).toContain('light')
    })
    test('does not set the swatch as light when color is dark', () => {
      const targetSwatch = wrapper.findAll('.swatch').at(3)
      expect(targetSwatch.classes()).not.toContain('light')
    })
  })
  describe('Color model', () => {
    test('displays each mode as an individual button', () => {
      const buttons = wrapper.findAll('.color-mode')
      buttons.wrappers.forEach(button => {
        expect(button.classes()).toEqual(
          expect.arrayContaining([expect.stringMatching(/color-mode-\w{1,}/)])
        )
      })
    })
    test('sets the first mode as the selected one by default', () => {
      const firstButton = wrapper.find('.color-mode')
      expect(firstButton.classes()).toContain('active')
    })
    test('sets the color mode button as active when clicked', () => {
      const targetButton = wrapper.findAll('.color-mode').at(2)
      targetButton.trigger('click')
      expect(targetButton.classes()).toContain('active')
    })
  })
  describe('Color code', () => {
    test('displays the default swatch in the default mode', () => {
      expect(wrapper.find('.color-code').text()).toEqual('#e3342f')
    })
    test('displays the code in the right color when changing color', () => {
      wrapper
        .findAll('.swatch')
        .at(2)
        .trigger('click')
      expect(wrapper.find('.color-code').text()).toEqual('#f6993f')
    })
    test('displays the code in the right mode when changing mode', () => {
      wrapper.find('.color-mode-hsl').trigger('click')
      expect(wrapper.find('.color-code').text()).toEqual('2°, 76%, 54%')
    })
  })
})
