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
    const reducers = {
      ...defaultReducers,
      webpack: webpackReducer(fileTimes, compilation),
    };
    press(content, templates, toPage, seed, reducers).then(
      ([pages, context]) => {
        if (context.webpack.changed.length === 0) {
          done();
          return;
        }
        render(pages, context).then((pages) => {
          pages.map((page) => {
            compilation.assets[`${page.path}index.html`.substring(1)] = {
              size: () => page.html.length,
              source: () => page.html,
            };
          });
          done();
        });
      }
    );
  };
};

export default tapAsyncCallback;
