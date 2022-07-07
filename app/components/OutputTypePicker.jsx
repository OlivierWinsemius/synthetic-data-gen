import { Select } from "./Select";

export const OutputTypePicker = (props) => {
  return (
    <Select
      options={[
        { value: "csv", label: "CSV" },
        { value: "json", label: "JSON" },
      ]}
      {...props}
    />
  );
};
