import { v4 as uuidv4 } from "uuid";
import { validateValue } from "./validators";

const generateUUID = (options) => {
  return uuidv4(options);
};

const generateID = (options) => {
  const offset = options.offset ?? 0;
  const rowNumber = options.rowNumber ?? 0;

  return rowNumber + offset;
};

const generateBoolean = (options) => {
  const ratio = options.ratio ?? 0.5;

  return Math.random() < ratio;
};

const generateGaussianNumber = (options) => {
  const mu = options.mu ?? 0;
  const sigma = options.sigma ?? 1;

  let x, y, r;
  do {
    x = Math.random() * 2 - 1;
    y = Math.random() * 2 - 1;
    r = x * x + y * y;
  } while (!r || r > 1);

  return mu + sigma * y * Math.sqrt((-2 * Math.log(r)) / r);
};

const generateRandomNumber = (options) => {
  const min = options.min ?? 0;
  const max = options.max ?? 1;

  let value = Math.random();
  value *= max - min;
  value += min;

  return value;
};

const generateNumber = (options) => {
  const type = options.type ?? "random";
  const step = options.step ?? 0.01;
  const isInteger = Number.isInteger(step);
  const precision = isInteger ? 1 : `${step}`.split(".").pop().length;

  let value = 0;

  if (type === "gauss") {
    value = generateGaussianNumber(options);
  } else if (type === "random") {
    value = generateRandomNumber(options);
  }

  value -= value % step;
  const multiplier = 10 ** precision;

  return (value * multiplier) / multiplier;
};

const generateChoice = (choices) => {
  const isDistributed = Array.isArray(choices[0]);

  if (!isDistributed) {
    const index = generateRandomNumber({ max: choices.length });
    return choices[index];
  }

  const randomNumber = Math.random();
  const addedChoices = choices.reduce(
    (prev, [value, percentage]) => [
      ...prev,
      [value, percentage + prev.unshift()[1] ?? 0]
    ],
    []
  );

  return addedChoices.find((choice) => choice[1] > randomNumber);
};

const generateValue = ({ fieldSchema, rowNumber }) => {
  const schemaValue = fieldSchema.value;
  const schemaOptions = fieldSchema.options ?? {};
  const options = { ...schemaOptions, rowNumber };

  if (schemaValue == "uuid") {
    return generateUUID(options);
  }

  if (schemaValue == "id") {
    return generateID(options);
  }

  if (schemaValue == "number") {
    return generateNumber(options);
  }

  if (schemaValue == "boolean") {
    return generateBoolean(options);
  }

  if (Array.isArray(schemaValue)) {
    return generateChoice(schemaValue);
  }

  return schemaValue;
};


export const generateData = (template) => {
  const range = new Array(template.size).map((_, index) => index)
  const schema = template.schema

  return range.map((rowNumber) => {
    const row = {}

    Object.entries(schema).forEach(([fieldName, fieldSchema]) => {
      row[fieldName] = generateValue({fieldName, fieldSchema, rowNumber})
    })

    Object.keys(schema).forEach((fieldName) => {
      row[fieldName] = validateValue({row, schema, fieldName})
    })

    return row
  })
}
