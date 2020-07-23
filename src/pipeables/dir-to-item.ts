import Directory from "../types/directory";
import Item from "../types/item";

/**
 * Create an Item from a File ready to pipe through a Directory pipe.
 */
const dirToItem = (dir: Directory): Item => ({
  ...dir,
  mdHtml: "",
  mdMeta: {},
});

export default dirToItem;
