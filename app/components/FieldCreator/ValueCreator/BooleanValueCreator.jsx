import { useEffect, useState } from "react";

const BooleanOptions = ({ setValue }) => {
  const [ratio, setRatio] = useState(0.5);

  useEffect(() => {
    if (ratio === 0.5) {
      setValue(undefined);
    } else {
      setValue({ ratio });
    }
  }, [setValue, ratio]);

  return (
    <div className="flex flex-col my-2">
      <span className="mx-2">ratio ({ratio}):</span>
      <input
        className="bg-slate-700 text-white text-center mx-2 h-8 rounded-md"
        type="range"
        min={0}
        max={1}
        step={0.001}
        value={ratio}
        onChange={(e) => setRatio(Number(e.target.value))}
      />
    </div>
  );
};

export const BooleanValueCreator = ({ setValue }) => {
  const [options, setOptions] = useState({});

  useEffect(() => {
    setValue({ options });
  }, [setValue, options]);

  return (
    <div>
      <BooleanOptions setValue={setOptions} />
    </div>
  );
};
