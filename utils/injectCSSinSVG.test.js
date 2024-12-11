import { injectCSSinSVG } from './'
import { describe, expect, it } from 'vitest'

describe('injectCSSinSVG', () => {
  it(`don't do anything if svg parameter is missing`, () => {
    expect.assertions(1)

    const svg = injectCSSinSVG()

    expect(svg).toBeUndefined()
  })

  it(`don't do anything if css parameter is missing`, () => {
    expect.assertions(1)

    const svg = injectCSSinSVG({ svg: '<svg></svg>' })

    expect(svg).toBe('<svg></svg>')
  })

  it('add css', () => {
    expect.assertions(1)

    const svg = injectCSSinSVG({
      svg: '<svg><rect/></svg>',
      css: 'rect { fill: red; }',
    })

    expect(svg).toBe(
      '<svg>\r\n<style>rect { fill: red; }</style>\r\n<rect/></svg>',
    )
  })

  it('add css complex case', () => {
    expect.assertions(1)

    const svg = injectCSSinSVG({
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40" class="svg-class test-class"><rect/></svg>',
      css: 'rect { fill: red; }',
    })

    expect(svg).toBe(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40" class="svg-class test-class">\r\n<style>rect { fill: red; }</style>\r\n<rect/></svg>',
    )
  })
})
