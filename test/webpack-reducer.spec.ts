import "mocha";
import { expect } from "chai";
import { webpackReducer, webpackSeed } from "../src/reducers/webpack";
import WebpackCompilation from "../src/types/webpack-compilation";
import Page from "../src/types/page";

type FileTimes = { [key: string]: number | undefined };

const fileTimeMap = (fileTimes: FileTimes = {}) => {
  const map = new Map<string, number | undefined>();
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

  it("finds all changed when no 'now' and no 'then' times", async () => {
    const reducer = webpackReducer(fileTimeMap(), compilation());
    const { all, changed } = await reducer(page1, webpackSeed);
    expect(all).to.deep.equal(dependencies);
    expect(changed).to.deep.equal(dependencies);
  });

  it("finds no changed files when 'now' and 'then' times are the same", async () => {
    const times = { file1: 123, file2: 456, file3: 789 };
    const reducer = webpackReducer(fileTimeMap(times), compilation(times));
    const { all, changed } = await reducer(page1, webpackSeed);
    expect(all).to.deep.equal(dependencies);
    expect(changed).to.deep.equal([]);
  });

  it("finds no changes when there are 'now' times but no 'then' times", async () => {
    const now = {};
    const then = { file1: 123, file2: 456, file3: 789 };
    const reducer = webpackReducer(fileTimeMap(now), compilation(then));
    const { all, changed } = await reducer(page1, webpackSeed);
    expect(all).to.deep.equal(dependencies);
    expect(changed).to.deep.equal([]);
  });

  it("finds changed files whose 'now' time is greater than 'then'", async () => {
    const now = { file1: 123, file2: 456, file3: 789 };
    const then = { file1: 123, file2: 256, file3: undefined };
    const reducer = webpackReducer(fileTimeMap(then), compilation(now));
    const { all, changed } = await reducer(page1, webpackSeed);
    expect(all).to.deep.equal(dependencies);
    expect(changed).to.deep.equal(["file2"]);
  });

  it("updates 'then' times after each page", async () => {
    const fileTimes = fileTimeMap();
    const times = { file1: 123, file2: 456, file3: 789 };
    const reducer = webpackReducer(fileTimes, compilation(times));
    await reducer(page1, webpackSeed);
    expect([...fileTimes.values()]).to.deep.equal([123, 456, 789]);
  });
});
