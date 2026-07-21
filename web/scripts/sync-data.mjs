import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const source = "../data/published/recalls.json";
const destination = "./public/recalls.json";

if (!existsSync(source)) {
  console.error(`Source file not found: ${source}`);
  process.exit(1);
}

mkdirSync(dirname(destination), { recursive: true });

copyFileSync(source, destination);

console.log("✓ Synced recalls.json to web/public/");
