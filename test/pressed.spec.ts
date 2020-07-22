import "mocha";
import { expect } from "chai";
import { join } from "path";
import { press, makePipe } from "../src/api";
import Dir from "../src/types/directory";

describe("press", () => {
  interface DirExtra extends Dir {
    extra: string;
  }

  const expected = [
    {
      name: "",
      path: "/",
      md:
        "---\ntemplate: 'home.pug'\ntags:\n - global\n---\n\n# Beverage vessels\n\nWelcome!",
    },
    {
      name: "french-press",
      path: "/french-press/",
      md:
        "---\nheadline: French press\ntags:\n - vessel\n---\n\n# French press\n\nThe French press is also known as a cafetière.",
    },
    {
      name: "tea-pot",
      path: "/tea-pot/",
      md:
        "---\nheadline: Tea pot\ntags:\n - vessel\n---\n\n# Tea pot\n\nA teapot is a vessel used for steeping tea leaves.",
    },
  ];

  const setup = () => {
    const toItem = (dir: Dir) => dir;
    const seed = { names: <string[]>[], pageCount: 0 };
    const reducers = {
      names: (dir: Dir, previous: string[]) => previous.concat(dir.name),
      pageCount: (dir: Dir, previous: number) => previous + 1,
    };
    const fixturePath = join(__dirname, "fixture");
    return { toItem, seed, reducers, fixturePath };
  };

  it("should parse each directory", async () => {
    const { toItem, fixturePath } = setup();
    const [items] = await press(fixturePath, toItem, {}, {});
    expect(items).to.deep.equal(expected);
  });

  it("should fold context with reducers", async () => {
    const { toItem, seed, reducers, fixturePath } = setup();
    const [items, context] = await press(fixturePath, toItem, seed, reducers);
    expect(items).to.deep.equal(expected);
    expect(context).to.deep.equal({
      names: ["", "french-press", "tea-pot"],
      pageCount: 3,
    });
  });

  it("should fold context with async reducers", async () => {
    const { toItem, seed, fixturePath } = setup();
    const reducers = {
      names: (dir: Dir, previous: string[]) =>
        Promise.resolve(previous.concat(dir.name)),
      pageCount: (dir: Dir, previous: number) => Promise.resolve(previous + 1),
    };
    const [dirs, context] = await press(fixturePath, toItem, seed, reducers);
    expect(dirs).to.deep.equal(expected);
    expect(context).to.deep.equal({
      names: ["", "french-press", "tea-pot"],
      pageCount: 3,
    });
  });

  it("transforms each dir", async () => {
    const { fixturePath } = setup();
    const toItem = (dir: Dir): DirExtra => ({ ...dir, extra: "sauce" });
    const [items] = await press(fixturePath, toItem, {}, {});
    const expected = ["sauce", "sauce", "sauce"];
    expect(items.map((item) => item.extra)).to.deep.equal(expected);
  });

  it("transforms items with a pipe", async () => {
    const { fixturePath } = setup();
    const pipeable = (dir: Dir): DirExtra => ({ ...dir, extra: "pipe" });
    const pipe = makePipe<Dir, null>()(pipeable);
    const [dirs] = await press(fixturePath, pipe, {}, {});
    const expected = ["pipe", "pipe", "pipe"];
    expect(dirs.map((dir) => dir.extra)).to.deep.equal(expected);
  });

  it("transforms dirs with an async pipe", async () => {
    const { fixturePath } = setup();
    const pipeable = (dir: Dir): Promise<DirExtra> =>
      Promise.resolve({ ...dir, extra: "async pipe" });
    const pipe = makePipe<Dir, null>()(pipeable);
    const [dirs] = await press(fixturePath, pipe, {}, {});
    const expected = ["async pipe", "async pipe", "async pipe"];
    expect(dirs.map((dir) => dir.extra)).to.deep.equal(expected);
  });
});
