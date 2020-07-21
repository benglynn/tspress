import Page from "../types/page";
import { load } from "js-yaml";
import HasMdMeta from "../types/has-md-meta";

const mdMeta = (page: Page): Page & HasMdMeta => {
  const match = page.md.match(/^---\n([\s\S]*)\n---/);
  const mdMeta = match === null ? {} : load(match[1]);
  return { ...page, mdMeta };
};

export default mdMeta;
