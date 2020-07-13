import { readFileSync } from "fs";
import { join } from "path";

const path = join(__dirname, "../fixture");
const home = readFileSync(join(path, "/index.md"), "utf8");
const frenchPress = readFileSync(join(path, "/french-press/index.md"), "utf8");
const teaPot = readFileSync(join(path, "/tea-pot/index.md"), "utf8");

export default [
  {
    name: "",
    path: "/",
    md: home,
  },
  {
    name: "french-press",
    path: "/french-press/",
    md: frenchPress,
  },
  {
    name: "tea-pot",
    path: "/tea-pot/",
    md: teaPot,
  },
];
