# Problem

State updates from the useState setter function are batched and happen at the end of
every render cycle. This is why there are two versions of the setter function params.

1. Single Value: `setCount(3)`
2. Callback: `setCount(prev => prev + 1)`

However, when developing a reducer function to use with React's Context provider,
the function takes the latest state, and an action, and returns a new state modified
according to the action provided.

This resembles either of the two above cases, as you could create an action that
accepts a Single Value, or define multiple actions that perform functions to
modify the current state into new state.

My question, is if these requests are batched and executed in sequence in the same
way as the state setter function calls.

# Experiments

We will use [count, setCount] as our example to experiment on.

```
// 1. Three value updates

// count = 0
setCount(3)
setCount(7)
setCount(5)
// Expect count === 5


// 2. Three callback updates

// count = 0
setCount(prev => prev + 3)
setCount(prev => prev + 2)
setCount(prev => prev + 1)
// Expect count === 6

// 3. Three calls referencing current state, no callback func

// count = 0
setCount(count + 2)
setCount(count + 2)
setCount(count + 2)
// Expect count = 2

// 4. Three calls using callback referencing current state

// count = 1
setCount(prev => prev + count)
setCount(prev => prev + count)
setCount(prev => prev + count)
// Expect count === 4
```

# Results

The React useReducer dispatch calls are indeed batched and behave the same as the
setState calls do.

Several dispatch calls on the same render cycle (demonstrated by several in a side effect)
are only called at the end of the render cycle and will only trigger a single component
render.

Dispatch calls made referencing the reducer's state object, will be referencing that state
object at the time of the invocation. So if a function references that state object multiple
times, even if there are mutations made through reducere actions, the function will reference
the initial state value each time.
