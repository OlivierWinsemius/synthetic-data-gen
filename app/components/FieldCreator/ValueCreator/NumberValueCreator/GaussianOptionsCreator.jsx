import { useEffect, useState } from "react";

export const GaussianOptionsCreator = ({ value, setValue }) => {
  const [mu, setMu] = useState(value.mu ?? 0);
  const [sigma, setSigma] = useState(value.sigma ?? 1);

  useEffect(() => {
    setValue({ mu, sigma });
  }, [setValue, mu, sigma]);

  return (
    <div className="flex flex-col">
      mu:
      <input
        type="number"
        value={mu}
        onChange={(e) => setMu(Number(e.target.value))}
      />
      sigma:
      <input
        type="number"
        value={sigma}
        onChange={(e) => setSigma(Number(e.target.value))}
      />
    </div>
  );
};
