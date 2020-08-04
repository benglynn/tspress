import pagePipe from "./page-pipe/page-pipe";
import { default as toPage_ } from "./page-pipe/to-page";
import mdMeta from "./page-pipe/md-meta";
import pugDeps from "./page-pipe/pug-deps";
import mdHtml from "./render-pipe/md-html";
import highlightCode from "./render-pipe/highlight-code";
import pugRender from "./render-pipe/pug-render";
import minify from "./render-pipe/minify";
import { tagsSeed, tagsReducer } from "./reducers/tags";
import pipe from "./pipe";

export const toPage = pagePipe(toPage_, mdMeta, pugDeps);
export const seed = { tags: tagsSeed };
export const reducers = { tags: tagsReducer };
export const render = pipe(mdHtml, highlightCode, pugRender, minify);
