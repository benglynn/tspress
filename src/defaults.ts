/** page pipe */
import pagePipe from "./page-pipe/page-pipe";
import { default as pageFromDir_ } from "./page-pipe/page-from-dir";
import mdMeta from "./page-pipe/md-meta";
import pugDeps from "./page-pipe/pug-deps";

/** reduce */
import { tagsSeed, tagsReducer } from "./reducers/tags";

/** render pipe */
import renderPipe from "./render-pipe/render-pipe";
import mdHtml from "./render-pipe/md-html";
import highlightCode from "./render-pipe/highlight-code";
import pugRender from "./render-pipe/pug-render";
import minify from "./render-pipe/minify";

export const pageFromDir = pagePipe(pageFromDir_, mdMeta, pugDeps);
export const seed = { tags: tagsSeed };
export const reducers = { tags: tagsReducer };
export const render = renderPipe(mdHtml, highlightCode, pugRender(), minify);
