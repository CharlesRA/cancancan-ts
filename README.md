# cancancan-ts

A simple and flexible authorization system inspired by [cancancan](https://github.com/CanCanCommunity/cancancan) in Ruby and [cancan](https://github.com/vadimdemedes/cancan) in JavaScript.

cancancan-ts is a lightweight TypeScript package for managing permissions in your projects. It draws strong inspiration from the Ruby gem cancancan. The goal is to provide a simple API for defining abilities (permissions) based on actions, resources, and optional custom conditions.

## Installation

`npm install cancancan-ts`

## Usage

```ts
import { Ability } from "cancancan-ts"

type Action = "read" | "update"
type Subject = "Post"

interface Post {
  id: number
  authorId: number
  title: string
}

const ability = new Ability<Action, Subject>()

ability.allow("read", "Post")

ability.allow<Post>("update", "Post", (post) => post.authorId === currentUser.id)

const currentUser = { id: 42 }

const post: Post = { id: 1, title: "Hello World", authorId: 42 }
const otherPost: Post = { id: 2, title: "Not yours", authorId: 99 }

console.log(ability.can("read", "Post")) // ✅ true
console.log(ability.can("update", "Post", post)) // ✅ true
console.log(ability.can("update", "Post", otherPost)) // ❌ false
```

## API

`ability.allow<T>(action: string, resource: string, condition?: (resource: T) => boolean)`

Defines an ability to perform action on resource. Optionally takes a condition function to further restrict when the ability applies.

`ability.can<T>(action: string, resource: string, resourceInstance?: T): boolean`

Defines an ability to perform action on resource. Optionally takes a condition function to further restrict when the ability applies
