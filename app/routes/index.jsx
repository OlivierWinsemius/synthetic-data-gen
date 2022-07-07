import { useActionData, useSubmit } from "@remix-run/react";
import { useEffect } from "react";
import { Template } from "../components/Template";
const { execSync } = require("child_process");
const fs = require("fs");

export const action = async ({ request }) => {
  const form = await request.formData();
  const template = JSON.parse(form.get("template"));
  const templateJsonFile = __dirname + "/../generator/template.json";
  const pythonFile = __dirname + "/../generator/main.py";
  const outputFile = __dirname + `/../public/data/template.${template.type}`;

  execSync(`echo '${JSON.stringify(template, null, 2)}' > ${templateJsonFile}`);
  execSync(`python3 ${pythonFile}`, { stdio: "inherit" });

  const data = fs.readFileSync(outputFile).toString();
  const url = `/data/template.${template.type}`;

  return { url, data };
};

export default function Index() {
  const { url, data } = useActionData() ?? {};
  const submit = useSubmit();

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onSubmit = (template) => {
    const formData = new FormData();
    formData.set("template", JSON.stringify(template));
    submit(formData, { method: "post", replace: true });
  };

  return (
    <div>
      <Template onSubmit={onSubmit} />
      {data && (
        <div className="flex flex-col m-4">
          <span>data:</span>
          <pre className="block whitespace-pre overflow-x-scroll">{data}</pre>
        </div>
      )}
      {url && <a href={url}>Download data</a>}
    </div>
  );
}
