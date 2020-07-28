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
    const locals = { ...page, ...context };
    return { ...page, html: render(locals) };
  });
};

export default pugRender;
