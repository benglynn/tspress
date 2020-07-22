import Item from "../types/item";
import { load } from "js-yaml";

/**
 * Parse metadata in a Directory's markdown.
 */
const mdMeta = (item: Item): Item => {
  const match = item.md.match(/^---\n([\s\S]*)\n---/);
  const mdMeta = match === null ? {} : load(match[1]);
  return { ...item, mdMeta };
};

export default mdMeta;
