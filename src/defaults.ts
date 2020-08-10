import Page from "./types/page";
import pagePipe from "./page-pipe/page-pipe";
import { default as pageFromDir_ } from "./page-pipe/page-from-dir";
import mdMeta from "./page-pipe/md-meta";
import pugDeps from "./page-pipe/pug-deps";
import renderPipe from "./render-pipe/render-pipe";
import mdHtml from "./render-pipe/md-html";
import highlightCode from "./render-pipe/highlight-code";
import pugRender from "./render-pipe/pug-render";
import minify from "./render-pipe/minify";
import RenderContext from "./types/render-context";
import { tagsSeed, tagsReducer } from "./reducers/tags";
import { pagesMapSeed, pagesMapReducer } from "./reducers/pages-map";

export const pageFromDir = pagePipe(pageFromDir_, mdMeta, pugDeps);
export const seed: RenderContext = {
  tags: tagsSeed,
  pagesMap: pagesMapSeed,
};
export const reducers = {
  tags: tagsReducer,
  pagesMap: pagesMapReducer,
};

type RenderPipe = (p: Page[], c: RenderContext) => Promise<Page[]>;
export const render: () => RenderPipe = () =>
  renderPipe(mdHtml, highlightCode, pugRender(), minify);
