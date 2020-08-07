import Page from "./types/page";
import pagePipe from "./page-pipe/page-pipe";
import { default as pageFromDir_ } from "./page-pipe/page-from-dir";
import mdMeta from "./page-pipe/md-meta";
import pugDeps from "./page-pipe/pug-deps";
import { tagsSeed, tagsReducer } from "./reducers/tags";
import renderPipe from "./render-pipe/render-pipe";
import mdHtml from "./render-pipe/md-html";
import highlightCode from "./render-pipe/highlight-code";
import pugRender from "./render-pipe/pug-render";
import minify from "./render-pipe/minify";
import RenderContext from "./types/render-context";

export const pageFromDir = pagePipe(pageFromDir_, mdMeta, pugDeps);
export const seed = { tags: tagsSeed };
export const reducers = { tags: tagsReducer };

type RenderPipe = (p: Page[], c: RenderContext) => Promise<Page[]>;
export const render: () => RenderPipe = () =>
  renderPipe(mdHtml, highlightCode, pugRender(), minify);
