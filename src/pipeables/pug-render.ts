import { compileFile, compileTemplate } from "pug";
import CompilePipeable from "../types/compile-pipeable";

const pugRender: CompilePipeable = (pages, context) => {
  const cache = new Map<string, compileTemplate>();
  return pages.map((page) => {
    const name = page.template;
    // TODO: render compile or render errors #17
    const render =
      cache.get(name) ||
      (cache.set(name, compileFile(name)).get(name) as compileTemplate);
    const locals = { ...page, ...context };
    return { ...page, html: render(locals) };
  });
};

export default pugRender;
