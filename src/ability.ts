export type ConditionFn<T = any> = (subject: T) => boolean

export interface Rule<A extends string = string, S extends string = string, T = any> {
  action: A
  subject: S
  condition?: ConditionFn<T>
}

export class Ability<A extends string = string, S extends string = string> {
  private rules: Rule<A, S>[] = []

  constructor() {}

  can<T>(action: A, subject: S, object?: T): boolean {
    return this.rules.some((rule) => {
      if (rule.action !== action || rule.subject !== subject) return false
      if (!rule.condition) return true
      return object ? rule.condition(object) : false
    })
  }

  allow<T>(action: A, subject: S, condition?: ConditionFn<T>) {
    this.rules.push({ action, subject, condition })
  }

  deny(action: A, subject: S) {
    this.rules = this.rules.filter((rule) => !(rule.action === action && rule.subject === subject))
  }

  getRules(): Rule<A, S>[] {
    return this.rules
  }

  clear() {
    this.rules = []
  }
}
