import { Select } from "./Select";

export const RandomTypePicker = (props) => {
  return (
    <Select
      options={[
        { value: "random", label: "Normal" },
        { value: "gauss", label: "Gaussian" },
      ]}
      {...props}
    />
  );
};
