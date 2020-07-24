import { compileFile, compileTemplate } from "pug";
import Page from "../types/page";
import CompileContext from "../types/compile-context";
import Pipeable from "../types/pipeable";

type PugRender = Pipeable<ReadonlyArray<Page>, CompileContext>;

const pugRender: PugRender = (pages, context) => {
  const cache = new Map<string, compileTemplate>();
  return pages.map((page) => {
    const name = page.template;
    // TODO: render compile or render errors
    const render =
      cache.get(name) ||
      (cache.set(name, compileFile(name)).get(name) as compileTemplate);
    // TODO: merge page and context into locals and avoid collisions?
    return { ...page, html: render({ ...page, ...context }) };
  });
};

export default pugRender;
