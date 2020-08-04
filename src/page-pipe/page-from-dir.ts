import Directory from "../types/directory";
import Page from "../types/page";

const pageFromDir = (dir: Directory): Page => ({
  ...dir,
  mdHtml: "",
  mdMeta: {},
  html: "",
  template: "",
});

export default pageFromDir;
