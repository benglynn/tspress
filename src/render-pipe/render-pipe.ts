import RenderContext from "../types/render-context";
import RenderPipeable from "../types/render-pipeable";
import Page from "../types/page";
import pipe from "../pipe";

export const renderPipe = (...pipeables: ReadonlyArray<RenderPipeable>) => (
  pages: Page[],
  context: RenderContext
): Promise<Page[]> =>
  Promise.all(pages.map((page) => pipe(...pipeables)(page, context)));

export default renderPipe;
