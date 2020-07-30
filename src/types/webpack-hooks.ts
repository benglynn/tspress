import WebpackCompilation from "./webpack-compilation";

interface WebpackHooks {
  emit: {
    tapAsync: (
      name: string,
      callback: (compilation: WebpackCompilation, callback: () => void) => void
    ) => void;
  };
}

export default WebpackHooks;
