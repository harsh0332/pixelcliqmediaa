/**
 * Resolves the "@/*" path alias for plain Node.
 *
 * The content modules import each other through the alias that tsconfig and the
 * bundler understand. The guard runs outside both, so this hook teaches Node
 * the same mapping rather than forcing the content layer to use relative paths
 * purely to suit a build script.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export async function resolve(specifier, context, next) {
  if (specifier.startsWith("@/")) {
    const base = path.join(projectRoot, "src", specifier.slice(2));
    const candidates = [base, `${base}.ts`, `${base}.tsx`, path.join(base, "index.ts")];
    for (const candidate of candidates) {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        return next(pathToFileURL(candidate).href, context);
      }
    }
  }
  return next(specifier, context);
}
