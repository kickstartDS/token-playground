import fs from "node:fs/promises";
import path from "node:path";
import $RefParser from "@apidevtools/json-schema-ref-parser";
import Ajv from "ajv/dist/2020.js";
import standaloneCode from "ajv/dist/standalone/index.js";

const ajv = new Ajv({ code: { source: true, esm: true } });

for await (const schemaPath of fs.glob("src/**/*.schema.json")) {
  const { dir, name, ext } = path.parse(schemaPath);
  const schema = await fs
    .readFile(schemaPath, "utf-8")
    .then(JSON.parse)
    .then($RefParser.dereference);

  const validate = ajv.compile(schema);
  const moduleCode = standaloneCode(ajv, validate);

  await Promise.all([
    fs.writeFile(
      path.join(dir, name + ".dereffed" + ext),
      JSON.stringify(schema, null, 2),
    ),
    fs.writeFile(path.join(dir, name + ".validate.js"), moduleCode),
  ]);
}
