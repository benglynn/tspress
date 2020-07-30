import "mocha";
import { expect } from "chai";
import { webpackReducer, webpackSeed } from "../src/reducers/webpack";
import WebpackCompilation from "../src/types/webpack-compilation";
import Page from "../src/types/page";

type FileTimes = { [key: string]: number };

const fileTimeMap = (fileTimes: FileTimes = {}) => {
  const map = new Map<string, number>();
  Object.entries(fileTimes).map(([file, time]) => map.set(file, time));
  return map;
};

const compilation = (fileTimes: FileTimes = {}): WebpackCompilation => ({
  assets: {},
  fileDependencies: new Set<string>(),
  fileTimestamps: fileTimeMap(fileTimes),
});

const dependencies = ["file1", "file2", "file3"];

const blankPage: Page = {
  dependencies: [],
  html: "",
  md: "",
  mdHtml: "",
  mdMeta: {},
  name: "",
  path: "",
  template: "",
};

const page1 = { ...blankPage, dependencies };
const page2 = { ...blankPage, dependencies };

describe("webpackReducer", () => {
  it("finds each dependency only once", async () => {
    const reducer = webpackReducer(fileTimeMap(), compilation());
    const previous = await reducer(page1, webpackSeed);
    const { all } = await reducer(page2, previous);
    expect(all).to.deep.equal(dependencies);
  });

  it("finds all unseen files as changed", async () => {
    const reducer = webpackReducer(fileTimeMap(), compilation());
    const { all, changed } = await reducer(page1, webpackSeed);
    expect(all).to.deep.equal(dependencies);
    expect(changed).to.deep.equal(dependencies);
  });
});
