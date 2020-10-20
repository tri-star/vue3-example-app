import { constraints } from '@/lib/validator/constraints'
import { constraintFunction } from '@/lib/validator/Rule'

describe('constraints', () => {
  describe('required', () => {
    let constraintFunction: constraintFunction
    beforeEach(() => {
      constraintFunction = constraints.required()
    })

    it('未入力の場合エラーになること', () => {
      const result = constraintFunction(undefined, {}, {}, {})
      expect(result.ok).toBe(false)
      expect(result.message).toBe('必ず入力してください')
    })

    it.each([null, '', true, false])(`空相当の値の場合エラーになること: %s`, (value: any) => {
      const result = constraintFunction(value, {}, {}, {})
      expect(result.ok).toBe(false)
      expect(result.message).toBe('必ず入力してください')
    })

    it(`数値の0は入力済と判定されること`, () => {
      const result = constraintFunction(0, {}, {}, {})
      expect(result.ok).toBe(true)
      expect(result.message).toBeUndefined()
    })

    it('値が入力済の場合はOKと判定されること', () => {
      const result = constraintFunction('a', {}, {}, {})
      expect(result.ok).toBe(true)
      expect(result.message).toBeUndefined
    })
  })

  describe('length', () => {
    const expectedError = '2文字以上10文字以内で入力してください'
    let constraintFunction: constraintFunction
    beforeEach(() => {
      constraintFunction = constraints.length(2, 10)
    })

    it('未入力の場合エラーになること', () => {
      const result = constraintFunction(undefined, {}, {}, {})
      expect(result.ok).toBe(false)
      expect(result.message).toBe(expectedError)
    })

    it.each([null, '', true, false])(`空相当の値の場合エラーになること: %s`, (value: any) => {
      const result = constraintFunction(value, {}, {}, {})
      expect(result.ok).toBe(false)
      expect(result.message).toBe(expectedError)
    })

    it.each([
      ['最小値未満: エラーになること', 'a', false],
      ['最小値: OKであること', 'aa', true],
      ['最大値: OKであること', 'aaaaaaaaaa', true],
      ['最大値+1: エラーになること', 'aaaaaaaaaaa', false],
    ])('%s', (title, value, expected) => {
      const result = constraintFunction(value, {}, {}, {})
      expect(result.ok).toBe(expected)
    })
  })
})
