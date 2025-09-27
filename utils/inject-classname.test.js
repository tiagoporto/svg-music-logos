import { describe, expect, it } from 'vitest'

import { injectClassName } from './'

// eslint-disable-next-line vitest/valid-title
describe(injectClassName, () => {
  describe('simple cases', () => {
    it('add class when already has a class attribute', () => {
      expect.assertions(1)

      const svg = injectClassName('<svg class="svg-class"></svg>', 'test-class')

      expect(svg).toBe('<svg class="svg-class test-class"></svg>')
    })

    it("add class when doesn't have a class attribute", () => {
      expect.assertions(1)

      const svg = injectClassName('<svg></svg>', 'test-class')

      expect(svg).toBe('<svg class="test-class"></svg>')
    })
  })

  describe('complex cases', () => {
    it('add class when already has a class attribute', () => {
      expect.assertions(1)

      /* eslint-disable no-secrets/no-secrets */
      const svg = injectClassName(
        '<svg class="svg-class1 svg-class2   svg-class3 test-class"><path class="path-class" d="8623iurkgjbfnkjh"/></svg>',
        'svg-class2 test-class',
      )

      expect(svg).toBe(
        '<svg class="svg-class1 svg-class2 svg-class3 test-class"><path class="path-class" d="8623iurkgjbfnkjh"/></svg>',
      )
      /* eslint-enable no-secrets/no-secrets */
    })

    it("add class when doesn't have a class attribute", () => {
      expect.assertions(1)

      /* eslint-disable no-secrets/no-secrets */
      const svg = injectClassName(
        '<svg><path class="path-class" d="8623iurkgjbfnkjh"/></svg>',
        'test-class',
      )

      expect(svg).toBe(
        '<svg class="test-class"><path class="path-class" d="8623iurkgjbfnkjh"/></svg>',
      )
      /* eslint-enable no-secrets/no-secrets */
    })
  })

  it('add multiple classes', () => {
    expect.assertions(1)

    const svg = injectClassName(
      '<svg class="svg-class"></svg>',
      'test-class1 test-class2 test-class3',
    )

    expect(svg).toBe(
      '<svg class="svg-class test-class1 test-class2 test-class3"></svg>',
    )
  })

  it('add classes when svg has classes and multiple atributes', () => {
    expect.assertions(1)

    const svg = injectClassName(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40" class="svg-class"></svg>',
      'test-class',
    )

    expect(svg).toBe(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40" class="svg-class test-class"></svg>',
    )
  })

  it(`don't do anything if classname parameter is missing`, () => {
    expect.assertions(1)

    const svg = injectClassName('<svg></svg>')

    expect(svg).toBe('<svg></svg>')
  })

  it(`don't do anything if svg parameter is missing`, () => {
    expect.assertions(1)

    const svg = injectClassName()

    expect(svg).toBeUndefined()
  })
})
