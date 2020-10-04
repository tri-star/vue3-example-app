export type RuleResult = {
  ok: boolean
  message?: string
}

export type constraintFunction = {
  (value: any, parameters: Record<string, any>, context: Record<string, any>): RuleResult
}

export type ConstraintObject = {
  name?: string
  rule: constraintFunction
  target?: string
  message?: string
  parameters?: Record<string, any>
}

type Rule = constraintFunction | ConstraintObject

export type RuleSet = Record<string, Rule>

export interface RuleCollectionInterface {
  getRules(): Record<string, RuleSet>
}

export class RuleCollection implements RuleCollectionInterface {
  protected collection: Record<string, RuleSet>

  public constructor() {
    this.collection = {}
  }

  getRules(): Record<string, RuleSet> {
    return this.collection
  }

  public addRule(field: string, rule: Rule): void {
    if (this.collection[field] === undefined) {
      this.collection[field] = {}
    }
    this.collection[field][rule.name ?? 'default'] = rule
  }

  public addRules(field: string, rules: Array<Rule>): void {
    if (this.collection[field] === undefined) {
      this.collection[field] = {}
    }
    rules.forEach((rule) => {
      this.collection[field][rule.name ?? 'default'] = rule
    })
  }

  public removeRule(field: string, ruleName?: string): void {
    if (ruleName === undefined) {
      delete this.collection[field]
      return
    }
    delete this.collection[field][ruleName]
  }
}
