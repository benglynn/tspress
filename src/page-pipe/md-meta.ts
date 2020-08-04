import { load } from "js-yaml";
import Page from "../types/page";

const mdMeta = (page: Page): Page => {
  const match = page.md.match(/^---\n([\s\S]*)\n---/);
  const mdMeta = match === null ? {} : load(match[1]);
  return { ...page, mdMeta };
};

export default mdMeta;
