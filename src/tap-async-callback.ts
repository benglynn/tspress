import WebpackOptions from "./types/webpack-options";
import WebpackCompilation from "./types/webpack-compilation";
import {
  toPage,
  seed as defaultSeed,
  reducers as defaultReducers,
  render,
} from "./defaults";
import press from "./press";
import { webpackReducer, webpackSeed } from "./reducers/webpack";

const tapAsyncCallback = (
  options: WebpackOptions,
  content: string, // absolute path to markdown directory
  templates: string // absolute path to pug templates
) => {
  const fileTimes = new Map<string, number | undefined>();
  const seed = { ...defaultSeed, webpack: webpackSeed };
  return (compilation: WebpackCompilation, done: () => void) => {
    const webpack = webpackReducer(fileTimes, compilation);
    const reducers = { ...defaultReducers, webpack };
    const pressed = press(content, templates, toPage, seed, reducers);
    (async () => {
      const [pages, context] = await pressed;
      if (context.webpack.changed.length === 0) return;
      (await render(pages, context)).map((page) => {
        compilation.assets[`${page.path}index.html`.substring(1)] = {
          size: () => page.html.length,
          source: () => page.html,
        };
      });
    })().then(() => done());
  };
};

export default tapAsyncCallback;
