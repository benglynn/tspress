import showdown from "showdown";
import RenderPipeable from "../types/render-pipeable";

showdown.setFlavor("github");

const converter = new showdown.Converter({
  noHeaderId: true,
  simpleLineBreaks: false,
  metadata: true,
});

const mdHtml: RenderPipeable = (page) => ({
  ...page,
  mdHtml: converter.makeHtml(page.md),
});

export default mdHtml;
