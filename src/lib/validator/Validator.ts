import {
  asyncConstraintFunction,
  constraintFunction,
  ConstraintObject,
  RuleCollectionInterface,
  RuleResult,
} from './Rule'
import _get from 'lodash.get'
import _cloneDeep from 'lodash.clonedeep'

function isConstraintFunction(arg: any): arg is constraintFunction {
  return typeof arg === 'function'
}
function isConstraintObject(arg: any): arg is ConstraintObject {
  return arg.rule !== undefined || arg.asyncRule !== undefined
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
  private initialData: Record<string, any>
  private dirtyFlags: Record<string, boolean>

  public constructor(initialData?: Record<string, any>) {
    this.initialData = _cloneDeep(initialData) ?? {}
    this.dirtyFlags = {}
  }

  public setInitialData(initialData?: Record<string, any>) {
    this.initialData = _cloneDeep(initialData) ?? {}
    this.dirtyFlags = {}
  }

  public async validate(
    input: Record<string, any>,
    collection: RuleCollectionInterface,
    force: boolean = false,
    context?: Record<string, any>
  ): Promise<ValidationResult> {
    const result = new ValidationResult()

    const rules = collection.getRules()
    let r: RuleResult
    let initialValue: any
    let value: any
    let rule: any
    let target: string
    let parameters: Record<string, any> = {}

    for (const field in rules) {
      initialValue = _get(this.initialData, field, undefined)
      value = _get(input, field)
      if (!force) {
        if (!this.isDirty(field) && value === initialValue) {
          continue
        }
      }
      this.setDirty(field)

      for (const ruleName in rules[field]) {
        rule = rules[field][ruleName]
        if (isConstraintFunction(rule)) {
          r = rule(value, parameters, input, context ?? {})
          target = field
        } else if (isConstraintObject(rule) && rule.rule) {
          r = rule.rule(value, parameters, input, context ?? {})
          target = rule.target ?? field
          parameters = rule.parameters ?? {}
        } else if (isConstraintObject(rule) && rule.asyncRule) {
          r = await rule.asyncRule(value, parameters, input, context ?? {})
          target = rule.target ?? field
          parameters = rule.parameters ?? {}
        } else {
          throw new Error(`無効なルールが指定されました: ${ruleName}`)
        }
        if (!r.ok && r.message) {
          result.add(target, [r.message])
        }
      }
    }

    return result
  }

  private isDirty(field: string): boolean {
    return this.dirtyFlags[field] !== undefined && this.dirtyFlags[field] === true
  }

  private setDirty(field: string): void {
    this.dirtyFlags[field] = true
  }
}
