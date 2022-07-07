import { useEffect, useState } from "react";

export const ChoiceInput = () => {};

export const ChoiceValueCreator = ({ setValue }) => {
  const [isCustomRatio, setIsCustomRatio] = useState(false);
  const [labels, setLabels] = useState([""]);
  const [ratios, setRatios] = useState([0.5]);

  const removeChoice = (index) => {
    const newLabels = [...labels];
    const newRatios = [...ratios];

    newLabels.splice(index, 1);
    newRatios.splice(index, 1);

    setLabels(newLabels);
    setRatios(newRatios);
  };

  const addChoice = () => {
    setLabels([...labels, ""]);
    setRatios([...ratios, 0.5]);
  };

  const setChoice = (index, value) => {
    const newLabels = [...labels];
    newLabels[index] = value;
    setLabels(newLabels);
  };

  const setRatio = (index, value) => {
    const newRatios = [...ratios];
    newRatios[index] = Number(value);
    setRatios(newRatios);
  };

  useEffect(() => {
    let choices = [...labels];
    if (isCustomRatio) {
      choices = labels.map((choice, index) => [choice, ratios[index]]);
    }

    setValue({ options: { choices } });
  }, [labels, isCustomRatio, ratios, setValue]);

  return (
    <div>
      {labels.map((label, index) => (
        <div key={index} className="my-2">
          <input
            className="bg-slate-700 text-white text-center rounded-md mx-2 px-4 h-8"
            value={label}
            onChange={(e) => setChoice(index, e.target.value)}
          />

          {isCustomRatio && (
            <input
              className="mr-2"
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={ratios[index]}
              onChange={(e) => setRatio(index, e.target.value)}
            />
          )}

          <button onClick={() => removeChoice(index)}>remove</button>
        </div>
      ))}
      <button
        onClick={addChoice}
        className="bg-slate-800 mx-2 px-4 text-white h-10 rounded-md disabled:opacity-50"
      >
        add choice
      </button>

      <div class="flex items-center m-2">
        <input
          id="custom-ratio"
          type="checkbox"
          value=""
          class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          checked={isCustomRatio}
          onChange={(e) => setIsCustomRatio(e.target.checked)}
        />
        <label
          for="custom-ratio"
          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Custom distribution
        </label>
      </div>
    </div>
  );
};
