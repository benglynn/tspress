import Directory from "../types/directory";
import { load } from "js-yaml";
import HasMdMeta from "../types/has-md-meta";

const mdMeta = (dir: Directory): Directory & HasMdMeta => {
  const match = dir.md.match(/^---\n([\s\S]*)\n---/);
  const mdMeta = match === null ? {} : load(match[1]);
  return { ...dir, mdMeta };
};

export default mdMeta;
