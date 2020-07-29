import WebpackCompilation from "./webpack-compilation";

interface WebpackHooks {
  emit: {
    tap: (
      name: string,
      callback: (compilation: WebpackCompilation) => void
    ) => void;
  };
}

export default WebpackHooks;
