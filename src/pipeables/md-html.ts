import Page from "../types/page";
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
const mdHtml = (page: Page): Page => {
  return { ...page, mdHtml: converter.makeHtml(page.md) };
};

export default mdHtml;
