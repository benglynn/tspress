import Directory from "../types/directory";
import Page from "../types/page";

/**
 * Convert a directory to a blank page.
 */
const toPage = (dir: Directory): Page => ({
  ...dir,
  mdHtml: "",
  mdMeta: {},
  html: "",
});

export default toPage;
