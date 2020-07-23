import "mocha";
import { expect } from "chai";
import { join } from "path";
import { press } from "../src/api";
import directoryPipe from "../src/directory-pipe";
import Directory from "../src/types/directory";
import { expectedDirs } from "./expected";

describe("press", () => {
  const setup = () => {
    const toItem = (dir: Directory) => dir;
    const seed = { names: <string[]>[], pageCount: 0 };
    const fixturePath = join(__dirname, "fixture");
    return { toItem, seed, fixturePath };
  };

  it("parse each directory", async () => {
    const { toItem, fixturePath } = setup();
    const [items] = await press(fixturePath, toItem, {}, {});
    expect(items).to.deep.equal(expectedDirs);
  });

  it("folds context with reducers", async () => {
    const { toItem, seed, fixturePath } = setup();
    const reducers = {
      names: (dir: Directory, previous: string[]) => previous.concat(dir.name),
      pageCount: (dir: Directory, previous: number) => previous + 1,
    };
    const [items, context] = await press(fixturePath, toItem, seed, reducers);
    expect(items).to.deep.equal(expectedDirs);
    expect(context).to.deep.equal({
      names: ["", "french-press", "tea-pot"],
      pageCount: 3,
    });
  });

  it("folds context with async reducers", async () => {
    const { toItem, seed, fixturePath } = setup();
    const reducers = {
      names: (dir: Directory, previous: string[]) =>
        Promise.resolve(previous.concat(dir.name)),
      pageCount: (dir: Directory, previous: number) =>
        Promise.resolve(previous + 1),
    };
    const [dirs, context] = await press(fixturePath, toItem, seed, reducers);
    expect(dirs).to.deep.equal(expectedDirs);
    expect(context).to.deep.equal({
      names: ["", "french-press", "tea-pot"],
      pageCount: 3,
    });
  });

  it("pipes directories through pipeables", async () => {
    const { fixturePath } = setup();
    const changeName = (dir: Directory): Directory => ({
      ...dir,
      name: "pipe",
    });
    const [dirs] = await press(fixturePath, directoryPipe(changeName), {}, {});
    const expected = ["pipe", "pipe", "pipe"];
    expect(dirs.map((dir) => dir.name)).to.deep.equal(expected);
  });

  it("pipes directories through async pipeables", async () => {
    const { fixturePath } = setup();
    const changeName = (dir: Directory): Promise<Directory> =>
      Promise.resolve({ ...dir, name: "async pipe" });
    const [dirs] = await press(fixturePath, directoryPipe(changeName), {}, {});
    const expected = ["async pipe", "async pipe", "async pipe"];
    expect(dirs.map((dir) => dir.name)).to.deep.equal(expected);
  });
});
