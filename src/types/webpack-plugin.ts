import WebpackCompiler from "./webpack-compiler";

interface WebpackPlugin {
  apply: (compiler: WebpackCompiler) => void;
}

export default WebpackPlugin;
