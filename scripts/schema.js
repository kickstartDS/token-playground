import fs from "node:fs/promises";
import path from "node:path";
import $RefParser from "@apidevtools/json-schema-ref-parser";

for await (const schemaPath of fs.glob("src/**/*.schema.json")) {
  const { dir, name, ext } = path.parse(schemaPath);
  const schema = await fs
    .readFile(schemaPath, "utf-8")
    .then(JSON.parse)
    .then($RefParser.dereference);

  await fs.writeFile(
    path.join(dir, name + ".dereffed" + ext),
    JSON.stringify(schema, null, 2),
  );
}
