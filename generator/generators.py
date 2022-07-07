import random, uuid


def generateUUID():
    return str(uuid.uuid4())


def generateID(rowNumber, options):
    offset = options.get("offset") or 0

    return rowNumber + offset


def valueOrRowValue(value, row):
    if isinstance(value, str) and "field." in value:
        newValue = value

        for field in row.keys():
            newValue = newValue.replace(f"field.{field}", str(row[field]))

        return newValue

    return value


def generateChoice(options, row):
    choices = options.get("choices") or []

    isDistributed = isinstance(choices[0], list)

    randomChoice = None

    if not isDistributed:
        randomChoice = random.choice(choices)
    else:
        totalAddedRatios = sum(ratio for [_, ratio] in choices)
        choiceIterator = iter(choices)
        randomNumber = random.random() * totalAddedRatios

        ratio = 0
        while ratio < randomNumber:
            (value, range) = next(choiceIterator) or [choices[-1], randomNumber]
            randomChoice = value
            ratio += range

    return valueOrRowValue(randomChoice, row)


def generateBoolean(options):
    ratioOption = options.get("ratio")
    ratio = 0.5 if ratioOption is None else ratioOption

    return random.random() < ratio


def generateGaussianNumber(options):
    mu = options.get("mu") or 0.0
    sigma = options.get("sigma") or 1.0

    return random.gauss(mu, sigma)


def generateRandomNumber(options):
    min = options.get("min") or 0
    max = options.get("max") or 1

    value = random.random()
    value *= max - min
    value += min

    return value


def generateNumber(options):
    type = options.get("type") or "random"
    step = options.get("step") or 0.01
    isInteger = isinstance(step, int)
    precision = len(str(step).split(".").pop())

    value = 0

    if type == "gauss":
        value = generateGaussianNumber(options)
    elif type == "random":
        value = generateRandomNumber(options)

    if isInteger:
        return int(value)

    value -= value % step
    multiplier = 10**precision
    return int(value * multiplier) / multiplier


def generateValue(row, fieldSchema, rowNumber):
    valueType = fieldSchema["type"]
    options = fieldSchema.get("options") or {}

    if valueType == "uuid":
        return generateUUID()

    if valueType == "id":
        return generateID(rowNumber, options)

    if valueType == "number":
        return generateNumber(options)

    if valueType == "boolean":
        return generateBoolean(options)

    if valueType == "choice":
        return generateChoice(options, row)

    return valueType
