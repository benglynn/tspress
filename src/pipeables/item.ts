import Directory from "../types/directory";
import Item from "../types/item";

/**
 * The start of a Directory -> Item pipeline, transforms a Directory into an
 * Item with 'empty' parameters, to simplify typing on subsequent pipeables
 * (Item in and Item out).
 */
const item = (dir: Directory): Item => ({
  ...dir,
  mdHtml: "",
  mdMeta: {},
});

export default item;
