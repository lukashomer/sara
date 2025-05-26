import {
  generateSchemaTypes,
  generateReactQueryComponents,
} from "@openapi-codegen/typescript";
import { defineConfig } from "@openapi-codegen/cli";
export default defineConfig({
  sara: {
    from: {
      source: "url",
      url: "https://sara-ai-be.replit.app/openapi.json",
    },
    outputDir: "/src/api",
    to: async (context) => {
      const filenamePrefix = "sara";
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
});
