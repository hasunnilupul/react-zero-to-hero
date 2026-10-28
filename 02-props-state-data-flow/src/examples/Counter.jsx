import { useState } from "react";

// Click each button and compare the results.
export default function Counter() {
  const [count, setCount] = useState(0);

  function addThreeWrong() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1); // all three read the same snapshot: still only +1
  }

  function addThreeRight() {
    setCount((c) => c + 1);
    setCount((c) => c + 1);
    setCount((c) => c + 1); // updater functions see the latest value: +3
  }

  return (
    <section>
      <p>Count: {count}</p>
      <button onClick={addThreeWrong}>+3 (snapshot, adds 1)</button>{" "}
      <button onClick={addThreeRight}>+3 (updater, adds 3)</button>{" "}
      <button onClick={() => setCount(0)}>Reset</button>
    </section>
  );
}
