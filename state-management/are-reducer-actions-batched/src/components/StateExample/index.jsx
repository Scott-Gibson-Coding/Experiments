import { useEffect, useState } from "react";
import { ExpSection } from "../UI";

export default function StateExample() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(1);

  // Unfilled dependency array to avoid infinite loop. This example would be better as
  // a function, not a side effect, and should be invocated on clicking a button.
  //
  // The behavior shown here (assuming not running in React.StrictMode) should be analogous
  // and the results are as expected. The above fix would just make the experiment closer
  // to a real world use case.
  useEffect(() => {
    setCount1(3);
    setCount1(7);
    setCount1(5);

    setCount2((prev) => prev + 3);
    setCount2((prev) => prev + 2);
    setCount2((prev) => prev + 1);

    setCount3(count3 + 2);
    setCount3(count3 + 2);
    setCount3(count3 + 2);

    setCount4((prev) => prev + count4);
    setCount4((prev) => prev + count4);
    setCount4((prev) => prev + count4);
  }, []);

  return (
    <section className="grid gap-4">
      <h2 className="text-center text-lg font-semibold text-blue-500">
        React useState Example
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
    </section>
  );
}
