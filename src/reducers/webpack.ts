import Page from "../types/page";
import WebpackCompilation from "../types/webpack-compilation";
import Reducer from "../types/reducer";

interface Dependencies {
  all: ReadonlyArray<string>;
  changed: ReadonlyArray<string>;
}

/**
 * Fold all dependencies and changed dependencies for webpack.
 */
export const webpackReducer = (
  fileTimes: Map<string, number>,
  compilation: WebpackCompilation
): Reducer<Page, Dependencies> => (page, previous) => {
  return {
    all: previous.all
      .concat(page.dependencies)
      .filter((file, index, array) => array.indexOf(file) === index),
    changed: previous.changed,
  };
};

export const webpackSeed: Dependencies = { all: [], changed: [] };
