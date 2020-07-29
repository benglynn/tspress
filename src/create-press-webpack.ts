import WebpackPlugin from "./types/webpack-plugin";
import tapAsyncCallback from "./tap-async-callback";
/**
 *
 * @param content absolute path to markdown directory
 * @param templates absolute path to pug templates
 */
const createPressWebpack = (
  content: string,
  templates: string
): WebpackPlugin => {
  return {
    apply: ({ hooks, options }) => {
      hooks.emit.tapAsync(
        "tspress-webpack",
        tapAsyncCallback(options, content, templates)
      );
    },
  };
};

export default createPressWebpack;
