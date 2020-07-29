import WebpackPlugin from "./types/webpack-plugin";
import tapCallback from "./tap-callback";

const createPressWebpack = (): WebpackPlugin => {
  return {
    apply: (hooks, options) => {
      hooks.emit.tap("press-webpack", tapCallback(options));
    },
  };
};

export default createPressWebpack;
