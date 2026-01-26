/** @import { Plugin } from 'vite' */
import fs from "node:fs/promises";
import path from "node:path";
import { processFile, schemaPattern } from "./schema.js";

/**
 * @returns {Plugin}
 */
export default function schemaPlugin() {
  return {
    name: "vite-schema",
    async buildStart() {
      for await (const schemaPath of fs.glob(schemaPattern)) {
        processFile(schemaPath);
      }
    },
    async handleHotUpdate({ file, server }) {
      if (path.matchesGlob(file, schemaPattern)) {
        await processFile(file);
        server.ws.send({
          type: "full-reload",
        });
        return [];
      }
    },
  };
}
