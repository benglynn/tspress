import { minify as squash } from "html-minifier";
import CompilePipeable from "../types/compile-pipeable";

const options = {
  collapseWhitespace: true,
};

/**
 * minify each page's html.
 */
const minify: CompilePipeable = (pages) =>
  pages.map((page) => ({
    ...page,
    html: squash(page.html, options),
  }));

export default minify;