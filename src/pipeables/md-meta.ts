import Page from "../types/page";
import { load } from "js-yaml";

/**
 * Parse the metadata in a pages markdown.
 */
const mdMeta = (page: Page): Page => {
  const match = page.md.match(/^---\n([\s\S]*)\n---/);
  const mdMeta = match === null ? {} : load(match[1]);
  return { ...page, mdMeta };
};

export default mdMeta;
