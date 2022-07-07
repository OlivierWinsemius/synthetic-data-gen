const numberRuleApplies = ({ fieldValue, rule }) => {
  const ruleOperator = rule.operator ?? "eq";
  const ruleValue = rule.value;

  if (ruleOperator === "eq") {
    return fieldValue === ruleValue;
  }

  if (ruleOperator === "gt") {
    return fieldValue > ruleValue;
  }

  if (ruleOperator === "gte") {
    return fieldValue >= ruleValue;
  }

  if (ruleOperator === "lt") {
    return fieldValue < ruleValue;
  }

  if (ruleOperator === "lte") {
    return fieldValue <= ruleValue;
  }

  return false;
};

const ruleApplies = ({ row, schema, rule }) => {
  const fieldValue = row[rule.field];
  const fieldSchema = schema[rule.field];

  if (fieldSchema.value === "number") {
    return numberRuleApplies({ fieldValue, rule });
  }

  return fieldValue === rule.value;
};

export const validateValue = ({ row, schema, fieldName }) => {
  const rowValue = row[fieldName];
  const fieldSchema = schema[fieldName];
  const rules = fieldSchema.rules ?? [];

  if (!rules.length) {
    return rowValue;
  }

  const applicableRule = rules.find((rule) =>
    ruleApplies({ row, schema, rule })
  );

  return applicableRule?.result ?? rowValue;
};
