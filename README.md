# Experiments

Experimentation on small things.

## State Management

### Question: Are reducer actions batched?

This seeks to answer the question: "Are reducer actions batched similar
to setState calls?"

This includes:

- Do multiple dispatch calls trigger multiple component renders, or
  are they batched together.
  - React's useState state setter function does batch to reduce
    component renders.
  - **RESULT**: Reducer dispatch calls are batched together as well.
- If you dispatch an action that changes state, and then reference that
  state in the same function, will the value be the original at function
  declaration, or the newly updated value?
  - All calls to a state value in a function will reference the value
    of that state at the time of calling the function. All references
    to state in that function are referring to the same constant
    regardless of state changes.
  - **RESULT**: References to reducer state refer to a snapshot of that
    state at the time of the function call in the same way.
