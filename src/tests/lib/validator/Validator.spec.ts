import { constraints } from '@/lib/validator/constraints'
import { RuleCollection } from '@/lib/validator/Rule'
import { Validator } from '@/lib/validator/Validator'

describe('Validator', () => {
  let validator: Validator
  let ruleCollection = new RuleCollection()

  beforeEach(() => {
    validator = new Validator()
    ruleCollection = new RuleCollection()
  })

  it('ルールがOKを返した場合、バリデーション結果のisErrorはfalseを返す', () => {
    ruleCollection.addRule('field1', constraints.required())
    const result = validator.validate(
      {
        field1: 'a',
      },
      ruleCollection
    )
    expect(result.isError()).toBe(false)
  })

  describe('ルールがエラーを返した場合', () => {
    it('バリデーション結果のisErrorはtrueを返す', () => {
      ruleCollection.addRule('field1', constraints.required())
      const result = validator.validate(
        {
          field1: '',
        },
        ruleCollection
      )
      expect(result.isError()).toBe(true)
    })

    it('バリデーション結果のgetMessageにはエラーが格納される', () => {
      ruleCollection.addRule('field1', constraints.required())
      const result = validator.validate(
        {
          field1: '',
        },
        ruleCollection
      )
      expect(result.getMessages('field1')).toStrictEqual(['必ず入力してください'])
    })

    it('1項目で2つエラーがあった場合2つとも返される', () => {
      ruleCollection.addRule('field1', constraints.required())
      ruleCollection.addRule('field1', {
        name: 'length',
        rule: constraints.length(5, 15),
      })
      const result = validator.validate(
        {
          field1: '',
        },
        ruleCollection
      )
      expect(result.getMessages('field1')).toStrictEqual([
        '必ず入力してください',
        '5文字以上15文字以内で入力してください',
      ])
    })
  })

  it('エラーメッセージを項目名とは別の名前で格納できること', () => {
    ruleCollection.addRule('field1', {
      target: 'another_name',
      rule: constraints.required(),
    })
    const result = validator.validate(
      {
        field1: '',
      },
      ruleCollection
    )
    expect(result.hasError('another_name')).toBe(true)
    expect(result.hasError('field1')).toBe(false)
    expect(result.getMessages('another_name')).toStrictEqual(['必ず入力してください'])
  })

  it('階層を持った入力データに対するバリデーションが出来ること', () => {
    ruleCollection.addRule('company.name', {
      rule: constraints.required(),
    })
    const result = validator.validate(
      {
        company: {
          name: '',
        },
      },
      ruleCollection
    )
    expect(result.hasError('company.name')).toBe(true)
  })

  describe('初期データを使うバリデーションの場合', () => {
    let validatorWithInitData: Validator

    beforeEach(() => {
      validatorWithInitData = new Validator()
    })

    it('初期データからデータが変わっていない場合はバリデーションされない', () => {
      const data = {
        name: '',
      }
      validatorWithInitData.setInitialData(data)
      ruleCollection.addRule('name', constraints.required())
      const result = validatorWithInitData.validate(data, ruleCollection)
      expect(result.isError()).toBe(false)
    })

    it('初期データからデータを変更するとバリデーションが行われる', () => {
      const data = {
        name: '',
      }
      validatorWithInitData.setInitialData(data)
      data['name'] = 'aaa'
      ruleCollection.addRule('name', constraints.maxLength(2))
      const result = validatorWithInitData.validate(data, ruleCollection)
      expect(result.isError()).toBe(true)
    })

    it('初期データからデータを変更した後は、初期データと同じ値に戻してもバリデーションが行われる', () => {
      const data = {
        name: '',
      }
      validatorWithInitData.setInitialData(data)
      data['name'] = 'aaa'
      ruleCollection.addRule('name', constraints.required())
      let result = validatorWithInitData.validate(data, ruleCollection)
      expect(result.isError()).toBe(false)

      data['name'] = ''
      result = validatorWithInitData.validate(data, ruleCollection)
      expect(result.isError()).toBe(true)
    })
  })
})
