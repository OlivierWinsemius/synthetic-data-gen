import { BooleanRuleCreator } from "./BooleanRuleCreator";
import { ChoiceRuleCreator } from "./ChoiceRuleCreator";
import { NumberRuleCreator } from "./NumberRuleCreator";

export const RuleValueCreator = ({ field, ...props }) => {
  console.log(field);
  switch (field.type) {
    case "number":
      return <NumberRuleCreator {...props} />;
    case "boolean":
      return <BooleanRuleCreator {...props} />;
    case "choice":
      return <ChoiceRuleCreator {...props} />;
    default:
      return null;
  }
};
