import "mocha";
import { expect } from "chai";
import { join } from "path";
import { press } from "../src/api";
import pagePipe from "../src/page-pipe";
import Directory from "../src/types/directory";
import { expectedDirs } from "./expected";

describe("press", () => {
  const setup = () => {
    const toPage = (dir: Directory) => dir;
    const seed = { names: <string[]>[], pageCount: 0 };
    const contentPath = join(__dirname, "fixture/content");
    const templatePath = join(__dirname, "fixture/templates");
    return { toPage, seed, contentPath, templatePath };
  };

  it("parse each directory", async () => {
    const { toPage, contentPath, templatePath } = setup();
    const [pages] = await press(contentPath, templatePath, toPage, {}, {});
    expect(pages).to.deep.equal(expectedDirs);
  });

  it("folds context with reducers", async () => {
    const { toPage, seed, contentPath, templatePath } = setup();
    const reducers = {
      names: (dir: Directory, previous: string[]) => previous.concat(dir.name),
      pageCount: (dir: Directory, previous: number) => previous + 1,
    };
    const [pages, context] = await press(
      contentPath,
      templatePath,
      toPage,
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
    const { toPage, seed, contentPath, templatePath } = setup();
    const reducers = {
      names: (dir: Directory, previous: string[]) =>
        Promise.resolve(previous.concat(dir.name)),
      pageCount: (dir: Directory, previous: number) =>
        Promise.resolve(previous + 1),
    };
    const [dirs, context] = await press(
      contentPath,
      templatePath,
      toPage,
      seed,
      reducers
    );
    expect(dirs).to.deep.equal(expectedDirs);
    expect(context).to.deep.equal({
      names: ["", "french-press", "tea-pot"],
      pageCount: 3,
    });
  });

  it("pipes directories through pipeables", async () => {
    const { contentPath, templatePath } = setup();
    const changeName = (dir: Directory): Directory => ({
      ...dir,
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
    const changeName = (dir: Directory): Promise<Directory> =>
      Promise.resolve({ ...dir, name: "async pipe" });
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
