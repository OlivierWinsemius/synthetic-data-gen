import { useFieldPicker } from "./Schema";

export const Field = ({ label, schema, onRemove }) => {
  const { type, options, rules } = schema;
  const [fieldPicker, dispatchFieldPicker] = useFieldPicker();

  const startPicking = () => {
    if (!fieldPicker.isPicking) {
      return;
    }

    const field = { ...schema, label };

    dispatchFieldPicker({
      type: "pick",
      payload: field,
    });
  };

  return (
    <div
      data-field={label}
      className="field w-full flex flex-col bg-slate-200 rounded-md"
      onClick={startPicking}
    >
      <div className="p-2 flex justify-between">
        <span className="font-semibold">{label}</span>
        <button onClick={() => onRemove(label)}>remove</button>
      </div>

      <div className="p-2 border-t border-black">{JSON.stringify(type)}</div>

      {options && (
        <pre className="p-2 border-t border-black  block whitespace-pre overflow-x-scroll">
          {JSON.stringify(options, null, 2)}
        </pre>
      )}

      {rules && (
        <pre className="p-2 border-t border-black  block whitespace-pre overflow-x-scroll">
          {JSON.stringify(rules, null, 2)}
        </pre>
      )}
    </div>
  );
};
