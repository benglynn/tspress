import WebpackOptions from "./types/webpack-options";
import WebpackCompilation from "./types/webpack-compilation";

const tapCallback = (options: WebpackOptions) => (
  compilation: WebpackCompilation
) => {
  console.log("tapped press callback");
};

export default tapCallback;
