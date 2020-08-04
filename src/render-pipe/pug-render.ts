import { compileFile, compileTemplate } from "pug";
import RenderPipeable from "../types/render-pipeable";

const pugRender = (): RenderPipeable => {
  const cache = new Map<string, compileTemplate>();
  return (page, context) => {
    const name = page.template;
    // TODO: render compile or render errors #17
    const render =
      cache.get(name) ||
      (cache.set(name, compileFile(name)).get(name) as compileTemplate);
    const locals = { ...page, ...context };
    return { ...page, html: render(locals) };
  };
};

export default pugRender;
