import { useEffect, useState } from "react";
import { RandomTypePicker } from "../../../RandomTypePicker";
import { GaussianOptionsCreator } from "./GaussianOptionsCreator";
import { RandomOptionsCreator } from "./RandomOptionsCreator";

export const NumberOptionsCreator = ({ type, ...props }) => {
  switch (type) {
    case "random":
      return <RandomOptionsCreator {...props} />;
    case "gauss":
      return <GaussianOptionsCreator {...props} />;
    default:
      return null;
  }
};

export const NumberValueCreator = ({ setValue }) => {
  const [type, setType] = useState("random");
  const [options, setOptions] = useState({});

  useEffect(() => {
    setValue({ options: { ...options, type } });
  }, [options, setValue, type]);

  return (
    <div className="flex flex-col">
      <span className="mx-2">type:</span>
      <RandomTypePicker value={type} setValue={setType} />
      <div className="m-2">
        <NumberOptionsCreator
          type={type}
          value={options}
          setValue={setOptions}
        />
      </div>
    </div>
  );
};
