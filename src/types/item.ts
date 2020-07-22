import Directory from "./directory";

/**
 * When pressed, Directories are converted to Items in a pipe before being
 * reduced.
 */
interface Item extends Directory {
  mdMeta: { [key: string]: any };
  mdHtml: string;
}

export default Item;
