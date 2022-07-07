import json, csv
import os
from formatters import formatValue

from generators import generateValue
from validators import validateValue

dirname = os.path.dirname(__file__)
outputDir = f"{dirname}/../public/data/"


def loadTemplate():
    templateFile = open(f"{dirname}/template.json")
    return json.load(templateFile)


def writeOutput(data, template, filename):
    schema = template["schema"]
    type = template["type"]

    with open(f"{outputDir}{filename}.{type}", "w") as outfile:
        if type == "json":
            json.dump(data, outfile, indent=2)
            return

        if type == "csv":
            fieldnames = [
                field
                for (field, fieldSchema) in schema.items()
                if not fieldSchema.get("hidden")
            ]

            writer = csv.DictWriter(outfile, fieldnames)
            writer.writeheader()
            writer.writerows(data)
            return


def generateData(template):
    size = template["size"]
    schema = template["schema"]

    data = []

    for index in range(size):
        rowNumber = index + 1
        row = {}

        for fieldName, fieldSchema in schema.items():
            row[fieldName] = generateValue(row, fieldSchema, rowNumber)
            row[fieldName] = validateValue(row, schema, fieldName)
            row[fieldName] = formatValue(row[fieldName], fieldSchema, row)

        row = {field: row[field] for field in row if not schema[field].get("hidden")}

        data.append(row)

    return data
