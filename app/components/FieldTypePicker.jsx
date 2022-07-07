import { Select } from "./Select";

export const FieldTypePicker = (props) => {
  return (
    <Select
      options={[
        { value: "", label: "Pick a type of field..." },
        { value: "id", label: "ID" },
        { value: "uuid", label: "UUID" },
        { value: "boolean", label: "Boolean" },
        { value: "number", label: "Number" },
        { value: "choice", label: "Choice" },
      ]}
      {...props}
    />
  );
};
