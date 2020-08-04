import Directory from "../types/directory";
import Page from "../types/page";

const toPage = (dir: Directory): Page => ({
  ...dir,
  mdHtml: "",
  mdMeta: {},
  html: "",
  template: "",
});

export default toPage;
