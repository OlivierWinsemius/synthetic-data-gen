import { useEffect, useState } from "react";
import { RuleValueCreator } from "./RuleValueCreator";

export const RuleCreator = ({ setValue, field, onClose }) => {
  const [rule, setRule] = useState({ field: field.label });

  useEffect(() => {
    setValue(rule);
  }, [rule, setValue]);

  return (
    <div className="py-2 border-t border-black">
      <div className="w-full flex justify-between px-2">
        <span>{field.label}</span>
        <button onClick={onClose}>X</button>
      </div>
      <div className="p2">
        <RuleValueCreator field={field} />
      </div>
    </div>
  );
};
