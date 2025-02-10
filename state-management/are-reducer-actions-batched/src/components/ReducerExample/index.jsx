import { useEffect, useReducer } from "react";
import { ExpSection } from "../UI";

/**
 * @state {
 *    count: number,
 * }
 *
 * @action {
 *    type: "set-count",
 *    payload: number,
 * }
 *
 * @action {
 *    type: "perform-on-count",
 *    payload: (number) => number,
 * }
 */
function reducer(state, action) {
  switch (action.type) {
    case "set-count": {
      const newState = { ...state };
      newState.count = action.payload;
      return newState;
    }
    case "perform-on-count": {
      const updateFunc = action.payload;

      const newState = { ...state };
      newState.count = updateFunc(newState.count);
      return newState;
    }
  }
}

export default function ReducerExample() {
  const [{ count: count1 }, dispatch1] = useReducer(reducer, { count: 0 });
  const [{ count: count2 }, dispatch2] = useReducer(reducer, { count: 0 });
  const [{ count: count3 }, dispatch3] = useReducer(reducer, { count: 0 });
  const [{ count: count4 }, dispatch4] = useReducer(reducer, { count: 1 });

  // Unfilled dependency array to avoid infinite loop. This example would be better as
  // a function, not a side effect, and should be invocated on clicking a button.
  //
  // The behavior shown here (assuming not running in React.StrictMode) should be analogous
  // and the results are as expected. The above fix would just make the experiment closer
  // to a real world use case.
  useEffect(() => {
    dispatch1({
      type: "set-count",
      payload: 3,
    });
    dispatch1({
      type: "set-count",
      payload: 7,
    });
    dispatch1({
      type: "set-count",
      payload: 5,
    });

    dispatch2({
      type: "perform-on-count",
      payload: (count) => count + 2,
    });
    dispatch2({
      type: "perform-on-count",
      payload: (count) => count + 2,
    });
    dispatch2({
      type: "perform-on-count",
      payload: (count) => count + 2,
    });

    dispatch3({
      type: "set-count",
      payload: count3 + 2,
    });
    dispatch3({
      type: "set-count",
      payload: count3 + 2,
    });
    dispatch3({
      type: "set-count",
      payload: count3 + 2,
    });

    dispatch4({
      type: "perform-on-count",
      payload: (count) => count + count4,
    });
    dispatch4({
      type: "perform-on-count",
      payload: (count) => count + count4,
    });
    dispatch4({
      type: "perform-on-count",
      payload: (count) => count + count4,
    });
  }, []);

  return (
    <section className="grid gap-4">
      <h2 className="text-center text-lg font-semibold text-blue-500">
        React reducer Example
      </h2>
      <ExpSection
        title="Example 1 -- Value Updates"
        expectedResult={5}
        actualResult={count1}
      />
      <ExpSection
        title="Example 2 -- Callback Updates"
        expectedResult={6}
        actualResult={count2}
      />
      <ExpSection
        title="Example 3 -- Value Updates (using state)"
        expectedResult={2}
        actualResult={count3}
      />
      <ExpSection
        title="Example 4 -- Callback Updates (using state)"
        expectedResult={4}
        actualResult={count4}
      />
      <button
        onClick={() => {
          console.log("Initial count:", count1);
          dispatch1({
            type: "perform-on-count",
            payload: (count) => count + 1,
          });
          console.log("New count:", count1);
          dispatch1({
            type: "perform-on-count",
            payload: (count) => count + 1,
          });
          console.log("New count:", count1);
          dispatch1({
            type: "perform-on-count",
            payload: (count) => count + 1,
          });
          console.log("New count:", count1);
        }}
      >
        Click Me
      </button>
    </section>
  );
}
