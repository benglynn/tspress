import Page from "../types/page";
import WebpackCompilation from "../types/webpack-compilation";
import Reducer from "../types/reducer";

interface Dependencies {
  all: ReadonlyArray<string>;
  changed: ReadonlyArray<string>;
}

export const webpackReducer = (
  fileTimes: Map<string, number | undefined>,
  compilation: WebpackCompilation
): Reducer<Page, Dependencies> => (page, previous) => {
  const additions = page.dependencies.filter(
    (name) => previous.all.includes(name) === false
  );
  const changed = additions.filter((n) => {
    compilation.fileDependencies.add(n);
    const then = fileTimes.get(n);
    const now = compilation.fileTimestamps.get(n);
    fileTimes.set(n, now || Date.now());
    return now === undefined || (then !== undefined && then < now);
  });
  return {
    all: previous.all.concat(additions),
    changed: previous.changed.concat(changed),
  };
};

export const webpackSeed: Dependencies = { all: [], changed: [] };
