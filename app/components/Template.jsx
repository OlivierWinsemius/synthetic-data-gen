import { useState } from "react";
import { OutputTypePicker } from "./OutputTypePicker";
import { Schema } from "./Schema";

export const Template = ({ onSubmit }) => {
  const [schema, setSchema] = useState({
    patientId: {
      type: "id",
    },
  });

  const [size, setSize] = useState(10);
  const [type, setType] = useState("csv");
  const template = { type, size, schema };

  const handleSubmit = () => onSubmit(template);

  return (
    <div className="flex flex-col">
      <div className="mx-4 my-2">
        <span>type:</span>
        <OutputTypePicker value={type} setValue={setType} />
      </div>

      <div className="mx-4 my-2">
        <span>size:</span>
        <input
          className="bg-slate-700 text-white text-center rounded-md mx-2 h-8"
          type="number"
          step={1}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
        />
      </div>

      <Schema schema={schema} updateSchema={setSchema} />

      <div className="flex flex-col m-4">
        <span>template:</span>
        <pre className="block whitespace-pre overflow-x-scroll">
          {JSON.stringify(template, null, 2)}
        </pre>
      </div>

      <button
        className="bg-slate-800 mx-2 px-4 text-white h-10 rounded-md"
        onClick={handleSubmit}
      >
        Generate data
      </button>
    </div>
  );
};
