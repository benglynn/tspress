import Item from "../types/item";
import showdown from "showdown";

showdown.setFlavor("github");

const converter = new showdown.Converter({
  noHeaderId: true,
  simpleLineBreaks: false,
  metadata: true,
});

/**
 * Create HTML from a directory's markdown.
 */
const mdHtml = (item: Item): Item => {
  return { ...item, mdHtml: converter.makeHtml(item.md) };
};

export default mdHtml;
