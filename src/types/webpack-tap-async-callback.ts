import WebpackCompilation from "./webpack-compilation";

interface WebpackTapAsyncCallback {
  (compilation: WebpackCompilation, done: () => void): void;
}

export default WebpackTapAsyncCallback;
