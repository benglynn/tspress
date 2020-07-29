import WebpackOptions from "./types/webpack-options";
import WebpackCompilation from "./types/webpack-compilation";
import { toPage, seed, reducers, render } from "./defaults";
import Press from "./press";
import press from "./press";
import { reducer } from "./reducers/tags";

/**
 * @param options passed to the plugin apply method
 * @param content absolute path to markdown directory
 * @param templates absolute path to pug templates
 */
const tapAsyncCallback = (
  options: WebpackOptions,
  content: string,
  templates: string
) => (compilation: WebpackCompilation, done: () => void) => {
  press(content, templates, toPage, seed, reducers).then(([pages, context]) => {
    console.log("tapped tspress pressed");
    done();
  });
};

export default tapAsyncCallback;
