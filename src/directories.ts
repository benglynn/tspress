import { readdirSync } from "fs";

const directories = (path: string) =>
  readdirSync(path, { withFileTypes: true }).filter((dirent) =>
    dirent.isDirectory()
  );

export default directories;
