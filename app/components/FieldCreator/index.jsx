import { useCallback, useState } from "react";
import { FieldTypePicker } from "../FieldTypePicker";
import { RuleCreator } from "../RuleCreator";
import { useFieldPicker } from "../Schema";
import { ValueCreator } from "./ValueCreator";

export const FieldCreator = ({ onSave }) => {
  const [fieldType, setFieldType] = useState();
  const [label, setLabel] = useState("");
  const [value, setValue] = useState({});
  const [rules, setRules] = useState({});
  const [fieldPicker, dispatchFieldPicker] = useFieldPicker();
  const { [fieldPicker?.field?.label]: editingRule, ...currentRules } = rules;

  const handleSave = () => {
    if (!label || !fieldType) {
      return;
    }

    onSave({
      label,
      value: { type: fieldType, ...value, rules: Object.values(rules) },
    });

    setFieldType("");
    setLabel("");
    setValue({});
    setRules({});
    dispatchFieldPicker({ type: "stop" });
  };

  const setRule = useCallback(
    (rule) => {
      if (!Object.is(rules[rule.field], rule)) {
        setRules({ ...rules, [rule.field]: rule });
      }
    },
    [rules],
  );

  return (
    <div className="bg-slate-300 rounded-md py-2">
      <div className="flex flex-col my-2">
        <span className="mx-2">label:</span>
        <input
          className="bg-slate-700 text-white text-center mx-2 h-8 rounded-md"
          id="label"
          value={label}
          placeholder="Enter a label"
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>

      {label && (
        <div className="flex flex-col my-2">
          <span className="mx-2">field type:</span>
          <FieldTypePicker value={fieldType} setValue={setFieldType} />
        </div>
      )}

      <ValueCreator type={fieldType} value={value} setValue={setValue} />

      {!fieldPicker.field && (
        <>
          <div className="w-full border-slate-600 border-t" />
          <button
            onClick={() => dispatchFieldPicker({ type: "start" })}
            disabled={fieldPicker.isPicking}
            className="bg-slate-800 m-2 px-4 text-white h-10 rounded-md disabled:opacity-50"
          >
            Pick a field
          </button>
        </>
      )}

      {Object.values(currentRules).map((rule) => (
        <pre
          key={rule.field}
          className="p-2 block whitespace-pre overflow-x-scroll"
        >
          {JSON.stringify(rule, null, 2)}
        </pre>
      ))}

      {fieldPicker.field && (
        <RuleCreator
          field={fieldPicker.field}
          setValue={setRule}
          onClose={() => {
            dispatchFieldPicker({ type: "stop" });
            setRules(currentRules);
          }}
        />
      )}

      <div className="w-full border-slate-600 border-t" />

      <button
        disabled={!label || !fieldType}
        className="bg-slate-800 mx-2 mt-2 px-4 text-white h-10 rounded-md disabled:opacity-50"
        onClick={handleSave}
      >
        add field
      </button>
    </div>
  );
};
