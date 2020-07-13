import { readFileSync } from "fs";
import { readdirSync } from "fs";

export const file = (path: string) => readFileSync(path, "utf8");

export const directories = (path: string) =>
  readdirSync(path, { withFileTypes: true }).filter((dirent) =>
    dirent.isDirectory()
  );
