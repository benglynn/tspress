import { minify as squash } from "html-minifier";
import RenderPipeable from "../types/render-pipeable";

const options = {
  collapseWhitespace: true,
};

const minify: RenderPipeable = (page) => ({
  ...page,
  html: squash(page.html, options),
});

export default minify;
