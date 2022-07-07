import { useEffect, useState } from "react";

export const RandomOptionsCreator = ({ value, setValue }) => {
  const [min, setMin] = useState(value.min ?? 0);
  const [max, setMax] = useState(value.max ?? 10);
  const [step, setStep] = useState(value.step ?? 1);

  useEffect(() => {
    setValue({ min, max, step });
  }, [setValue, min, max, step]);

  return (
    <div className="flex flex-col">
      min:
      <input
        type="number"
        value={min}
        onChange={(e) => setMin(Number(e.target.value))}
        step={step}
      />
      max:
      <input
        type="number"
        value={max}
        onChange={(e) => setMax(Number(e.target.value))}
        step={step}
      />
      step:
      <input
        type="number"
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
        min={0}
      />
    </div>
  );
};
