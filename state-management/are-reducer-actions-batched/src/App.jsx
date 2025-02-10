import StateExample from "./components/StateExample";
import ReducerExample from "./components/ReducerExample";

export default function App() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-emerald-700">App</h1>
      <div className="mt-2 flex w-full flex-wrap justify-center gap-4 overflow-hidden">
        <StateExample />
        <ReducerExample />
      </div>
    </>
  );
}
