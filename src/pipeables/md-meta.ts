import Page from "../types/page";

interface HasMdMeta {
  mdMeta: any;
}

const mdMeta = (page: Page): Page & HasMdMeta => {
  return { ...page, mdMeta: {} };
};

export default mdMeta;
