import WebpackHooks from "./webpack-hooks";
import WebpackOptions from "./webpack-options";

interface WebpackCompiler {
  hooks: WebpackHooks;
  options: WebpackOptions;
}

export default WebpackCompiler;
