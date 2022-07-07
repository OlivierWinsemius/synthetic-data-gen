import { BooleanValueCreator } from "./BooleanValueCreator";
import { ChoiceValueCreator } from "./ChoiceValueCreator";
import { NumberValueCreator } from "./NumberValueCreator";

export const ValueCreator = ({ type, ...props }) => {
  switch (type) {
    case "number":
      return <NumberValueCreator {...props} />;
    case "boolean":
      return <BooleanValueCreator {...props} />;
    case "choice":
      return <ChoiceValueCreator {...props} />;
    default:
      return null;
  }
};
