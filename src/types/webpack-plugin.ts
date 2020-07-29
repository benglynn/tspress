import WebpackHooks from "./webpack-hooks";
import WebpackOptions from "./webpack-options";

interface WebpackPlugin {
  apply: (hooks: WebpackHooks, options: WebpackOptions) => void;
}

export default WebpackPlugin;
