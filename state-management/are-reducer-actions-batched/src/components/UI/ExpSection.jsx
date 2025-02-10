export default function ExpSection({ title, expectedResult, actualResult }) {
  return (
    <div className="rounded-lg bg-slate-200 px-4 py-2 text-lg">
      <h3 className="text-lg font-semibold text-nowrap overflow-ellipsis">
        {title}
      </h3>
      <div className="font-mono">
        <p>
          Result: <span className="font-bold">{actualResult}</span>
        </p>
        <p>
          Expected Result: <span className="font-bold">{expectedResult}</span>
        </p>
      </div>
    </div>
  );
}
