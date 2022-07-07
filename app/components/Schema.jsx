import { createContext, useContext, useReducer } from "react";
import { Field } from "./Field";
import { FieldCreator } from "./FieldCreator";

const initialState = { isPicking: false, field: null };

const FieldPicker = createContext([initialState, () => {}]);

export const useFieldPicker = () => useContext(FieldPicker);

const fieldPickerReducer = (state, action) => {
  switch (action.type) {
    case "start":
      return { isPicking: true, field: null };
    case "stop":
      return { isPicking: false, field: null };
    case "pick":
      return { isPicking: false, field: action.payload };
    default:
      return state;
  }
};

export const Schema = ({ schema, updateSchema }) => {
  const fieldPicker = useReducer(fieldPickerReducer, initialState);

  const fields = Object.entries(schema).map(([label, value]) => ({
    label,
    value,
  }));

  const addField = ({ label, value }) => {
    updateSchema({ ...schema, [label]: value });
  };

  const removeField = (label) => {
    const { [label]: omit, ...newSchema } = schema;
    updateSchema(newSchema);
  };

  console.log({ fieldPicker });

  return (
    <FieldPicker.Provider value={fieldPicker}>
      <div className="mx-4 my-2 grid grid-cols-3 gap-4">
        {fields.map(({ label, value }) => (
          <Field
            key={label}
            label={label}
            schema={value}
            onRemove={removeField}
          />
        ))}
      </div>

      <div className="mx-4 my-2">
        <FieldCreator onSave={addField} />
      </div>
    </FieldPicker.Provider>
  );
};
