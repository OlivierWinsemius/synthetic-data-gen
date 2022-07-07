from generators import valueOrRowValue


def validateNumber(value, rule):
    operator = rule["operator"]
    ruleValue = float(rule["value"])

    if operator == "eq":
        return value == ruleValue

    if operator == "gt":
        return value > ruleValue

    if operator == "gte":
        return value >= ruleValue

    if operator == "lt":
        return value < ruleValue

    if operator == "lte":
        return value <= ruleValue

    return False


def ruleApplies(row, schema, rule):
    fieldName = rule["field"]
    fieldValue = row[fieldName]
    fieldSchema = schema[fieldName]
    valueType = fieldSchema["type"]

    if valueType == "number":
        return validateNumber(float(fieldValue), rule)

    return fieldValue == rule["value"]


def validateValue(row, schema, fieldName):
    value = row[fieldName]
    fieldSchema = schema[fieldName]
    rules = fieldSchema.get("rules")

    if not rules:
        return value

    for rule in rules:
        if ruleApplies(row, schema, rule):
            return valueOrRowValue(rule["result"], row)

    return value
