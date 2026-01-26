import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import $RefParser from "@apidevtools/json-schema-ref-parser";
import Ajv from "ajv/dist/2020.js";
import standaloneCode from "ajv/dist/standalone/index.js";

export const schemaPattern = path.resolve(
  process.cwd(),
  "src/**/*.schema.json",
);
const ajv = new Ajv({ code: { source: true, esm: true } });

export const processFile = async (schemaPath) => {
  try {
    console.log("processing", schemaPath);
    const { dir, name, ext } = path.parse(schemaPath);
    const schema = await fs
      .readFile(schemaPath, "utf-8")
      .then(JSON.parse)
      .then($RefParser.dereference);

    ajv.removeSchema(schema.$id);
    const validate = ajv.compile(schema);
    const moduleCode = standaloneCode(ajv, validate);

    await Promise.all([
      fs.writeFile(
        path.join(dir, name + ".dereffed" + ext),
        JSON.stringify(schema, null, 2),
      ),
      fs.writeFile(path.join(dir, name + ".validate.js"), moduleCode),
    ]);
  } catch (e) {
    console.error(e);
  }
};

if (process.argv[2] === "all") {
  for await (const schemaPath of fs.glob(schemaPattern)) {
    processFile(schemaPath);
  }
}
