import Page from "../types/page";
import WebpackCompilation from "../types/webpack-compilation";
import Reducer from "../types/reducer";

type Deps = ReadonlyArray<string>;

/**
 * Fold all dependencies and changed dependencies for webpack.
 */
export const webpackReducer = (
  fileTimes: Map<string, number>,
  compilation: WebpackCompilation
): Reducer<Page, Deps> => (page, previous) => {
  console.log("REDUCING FOR WEBPACK");
  console.log(page.path);
  return previous;
};

export const webpackSeed = <Deps>[];
