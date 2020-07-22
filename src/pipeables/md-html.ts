import Directory from "../types/directory";
import showdown from "showdown";
import { PageMeta } from "./md-meta";

interface PageHtml extends PageMeta {
  mdHtml: string;
}

showdown.setFlavor("github");
const converter = new showdown.Converter({
  noHeaderId: true,
  simpleLineBreaks: false,
  metadata: true,
});

const mdHtml = (item: PageMeta): PageHtml => {
  return { ...item, mdHtml: converter.makeHtml(item.md) };
};

export default mdHtml;
