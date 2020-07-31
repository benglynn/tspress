import { readFileSync, Dirent } from "fs";
import { readdirSync } from "fs";

export const file = (path: string): string => readFileSync(path, "utf8");

export const directories = (path: string): ReadonlyArray<Dirent> =>
  readdirSync(path, { withFileTypes: true }).filter((dirent) =>
    dirent.isDirectory()
  );
