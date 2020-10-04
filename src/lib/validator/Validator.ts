import { constraints } from './constraints'
import { constraintFunction, ConstraintObject, RuleCollectionInterface, RuleResult } from './Rule'

function isConstraintFunction(arg: any): arg is constraintFunction {
  return typeof arg === 'function'
}
function isConstraintObject(arg: any): arg is ConstraintObject {
  return arg.rule !== undefined
}

export class ValidationResult {
  protected messages: Record<string, string[]>

  public constructor(messages?: Record<string, string[]>) {
    if (messages) {
      this.messages = messages
    } else {
      this.messages = {}
    }
  }

  public add(name: string, messages: string[]) {
    if (!this.messages[name]) {
      this.messages[name] = []
    }
    messages.forEach((message) => {
      this.messages[name].push(message)
    })
  }

  public getAll(): Record<string, string[]> {
    return this.messages
  }

  public getMessages(name: string): string[] {
    if (!this.messages[name]) {
      return []
    }
    return this.messages[name]
  }

  public getFirst(name: string): string {
    return this.messages[name][0]
  }

  public isError(): boolean {
    return Object.keys(this.messages).length > 0
  }

  public hasError(name: string): boolean {
    return this.messages[name] ? true : false
  }
}

export class Validator {
  public validate(input: Record<string, any>, collection: RuleCollectionInterface): ValidationResult {
    const result = new ValidationResult()

    const rules = collection.getRules()
    let r: RuleResult
    const value = ''
    let rule: any
    let constraint: constraintFunction
    let target: string
    let parameters: Record<string, any> = {}
    for (const field in rules) {
      for (const ruleName in rules[field]) {
        rule = rules[field][ruleName]
        if (isConstraintFunction(rule)) {
          constraint = rule
          target = field
        } else if (isConstraintObject(rule)) {
          constraint = rule.rule
          target = rule.target ?? field
          parameters = rule.parameters ?? {}
        } else {
          throw new Error(`無効なルールが指定されました: ${ruleName}`)
        }
        r = constraint(value, parameters, input)
        if (!r.ok && r.message) {
          result.add(target, [r.message])
        }
      }
    }

    return result
  }
}
