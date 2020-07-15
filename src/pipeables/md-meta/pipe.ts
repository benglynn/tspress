import Page from "../../types/page";
import HasMdMeta from "./has-md-meta";
import { load } from "js-yaml";

const pipe = (pages: Page[]): (Page & HasMdMeta)[] =>
  pages.map((page) => {
    const match = page.md.match(/^---\n([\s\S]*)\n---/);
    return { ...page, mdMeta: match === null ? {} : load(match[1]) };
  });

export default pipe;
