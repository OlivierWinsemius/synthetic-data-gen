from generators import valueOrRowValue


def formatValue(value, fieldSchema, row):
    options = fieldSchema.get("options") or {}
    prefix = options.get("prefix")
    suffix = options.get("suffix")

    newValue = value

    if prefix:
        prefixValue = valueOrRowValue(prefix, row)
        newValue = f"{prefixValue}{newValue}"

    if suffix:
        suffixValue = valueOrRowValue(suffix, row)
        newValue = f"{newValue}{suffixValue}"

    return newValue
