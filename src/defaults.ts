import { default as toPage_ } from "./pipeables/to-page";
import mdHtml from "./pipeables/md-html";
import mdMeta from "./pipeables/md-meta";
import pugDeps from "./pipeables/pug-deps";
import pugRender from "./pipeables/pug-render";
import minify from "./pipeables/minify";
import { tagsSeed, tagsReducer } from "./reducers/tags";
import pipe from "./pipe";
import pagePipe from "./page-pipe";

export const toPage = pagePipe(toPage_, mdMeta, pugDeps);
export const seed = { tags: tagsSeed };
export const reducers = { tags: tagsReducer };
export const render = pipe(mdHtml, pugRender, minify);
