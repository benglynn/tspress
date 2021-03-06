import "mocha";
import { expect } from "chai";
import { join } from "path";
import { press } from "../src/api";
import pagePipe from "../src/page-pipe/page-pipe";
import Directory from "../src/types/directory";
import Page from "../src/types/page";
import pageFromDir from "../src/page-pipe/page-from-dir";
import { expectedDirs } from "./expected/data";

describe("press", () => {
  const setup = () => {
    const pageFromDir = (dir: Directory) => dir;
    const seed = { names: <string[]>[], pageCount: 0 };
    const contentPath = join(__dirname, "fixture/content");
    const templatePath = join(__dirname, "fixture/templates");
    return { pageFromDir, seed, contentPath, templatePath };
  };

  it("parse each directory", async () => {
    const { pageFromDir, contentPath, templatePath } = setup();
    const [pages] = await press(contentPath, templatePath, pageFromDir, {}, {});
    expect(pages).to.deep.equal(expectedDirs);
  });

  it("folds context with reducers", async () => {
    const { pageFromDir, seed, contentPath, templatePath } = setup();
    const reducers = {
      names: (dir: Directory, previous: string[]) => previous.concat(dir.name),
      pageCount: (dir: Directory, previous: number) => previous + 1,
    };
    const [pages, context] = await press(
      contentPath,
      templatePath,
      pageFromDir,
      seed,
      reducers
    );
    expect(pages).to.deep.equal(expectedDirs);
    expect(context).to.deep.equal({
      names: ["", "french-press", "tea-pot"],
      pageCount: 3,
    });
  });

  it("folds context with async reducers", async () => {
    const { pageFromDir, seed, contentPath, templatePath } = setup();
    const reducers = {
      names: (dir: Directory, previous: string[]) =>
        Promise.resolve(previous.concat(dir.name)),
      pageCount: (dir: Directory, previous: number) =>
        Promise.resolve(previous + 1),
    };
    const [dirs, context] = await press(
      contentPath,
      templatePath,
      pageFromDir,
      seed,
      reducers
    );
    expect(dirs).to.deep.equal(expectedDirs);
    expect(context).to.deep.equal({
      names: ["", "french-press", "tea-pot"],
      pageCount: 3,
    });
  });

  it("pipes directories through page pipeables", async () => {
    const { contentPath, templatePath } = setup();
    const changeName = (dir: Directory): Page => ({
      ...pageFromDir(dir),
      name: "pipe",
    });
    const [dirs] = await press(
      contentPath,
      templatePath,
      pagePipe(changeName),
      {},
      {}
    );
    const expected = ["pipe", "pipe", "pipe"];
    expect(dirs.map((dir) => dir.name)).to.deep.equal(expected);
  });

  it("pipes directories through async pipeables", async () => {
    const { contentPath, templatePath } = setup();
    const changeName = (dir: Directory): Promise<Page> =>
      Promise.resolve({ ...pageFromDir(dir), name: "async pipe" });
    const [dirs] = await press(
      contentPath,
      templatePath,
      pagePipe(changeName),
      {},
      {}
    );
    const expected = ["async pipe", "async pipe", "async pipe"];
    expect(dirs.map((dir) => dir.name)).to.deep.equal(expected);
  });
});
