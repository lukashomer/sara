import { execSync } from "child_process";
import { config } from "dotenv";

// Load environment variables
config();

const apiUrl = process.env.VITE_API_URL;
if (!apiUrl) {
  console.error("VITE_API_URL is not defined in .env file");
  process.exit(1);
}

try {
  execSync(
    `npx openapi-typescript "${apiUrl}/openapi.json" -o src/api/openapi/api.ts`,
    { stdio: "inherit" }
  );
} catch (error) {
  console.error("Failed to generate API types:", error);
  process.exit(1);
}
