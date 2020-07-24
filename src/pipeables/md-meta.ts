import { join } from "path";
import { load } from "js-yaml";
import Page from "../types/page";
import PressContext from "../types/press-context";

/**
 * Fills the markdown metadata property with parsed markdown metadata.
 */
const mdMeta = (page: Page, ctx: PressContext): Page => {
  const match = page.md.match(/^---\n([\s\S]*)\n---/);
  const mdMeta = match === null ? {} : load(match[1]);
  return { ...page, mdMeta };
};

export default mdMeta;
