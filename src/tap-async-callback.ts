import WebpackOptions from "./types/webpack-options";
import WebpackCompilation from "./types/webpack-compilation";
import {
  toPage,
  seed as defaultSeed,
  reducers as defaultReducers,
} from "./defaults";
import press from "./press";
import { webpackReducer, webpackSeed } from "./reducers/webpack";
import { tagsReducer } from "./reducers/tags";

const tapAsyncCallback = (
  options: WebpackOptions,
  content: string, // absolute path to markdown directory
  templates: string // absolute path to pug templates
) => {
  console.log("just once surely?");
  const fileTimes = new Map<string, number | undefined>();
  const seed = { ...defaultSeed, webpack: webpackSeed };

  return (compilation: WebpackCompilation, done: () => void) => {
    const reducers = {
      ...defaultReducers,
      webpack: webpackReducer(fileTimes, compilation),
    };
    press(content, templates, toPage, seed, reducers).then(
      ([pages, context]) => {
        console.log("\n*************\ntspress\n");
        console.log(`changes: ${context.webpack.changed.length}`);
        done();
      }
    );
  };
};

export default tapAsyncCallback;
