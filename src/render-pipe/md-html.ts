import showdown from "showdown";
import CompilePipeable from "../types/compile-pipeable";

showdown.setFlavor("github");

const converter = new showdown.Converter({
  noHeaderId: true,
  simpleLineBreaks: false,
  metadata: true,
});

const mdHtml: CompilePipeable = (pages) => {
  return pages.map((page) => ({
    ...page,
    mdHtml: converter.makeHtml(page.md),
  }));
};

export default mdHtml;
