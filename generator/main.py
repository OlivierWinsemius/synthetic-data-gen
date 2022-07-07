from data import generateData, loadTemplate, writeOutput


def main():
    template = loadTemplate()
    data = generateData(template)
    writeOutput(data, template, "template")


if __name__ == "__main__":
    main()
