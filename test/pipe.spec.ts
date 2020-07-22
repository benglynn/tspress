import "mocha";
import { expect } from "chai";
import { join } from "path";
import { press, makePipe } from "../src/api";
import { compile } from "../src/pipe";
import Directory from "../src/types/directory";
import Item from "../src/types/item";

describe("pipe", () => {
  interface Context {
    names: Array<string>;
    pageCount: number;
  }
  interface DirExtra extends Directory {
    extra: string;
  }
  const setup = () => {
    const toItem = (dir: Directory) => dir;
    const seed = { names: <string[]>[], pageCount: 0 };
    const reducers = {
      names: (dir: Directory, previous: string[]) => previous.concat(dir.name),
      pageCount: (dir: Directory, previous: number) => previous + 1,
    };
    const fixturePath = join(__dirname, "fixture");
    return { toItem, seed, reducers, fixturePath };
  };

  it("passes data through any number of pipeables", async () => {
    interface Context {
      names: Array<string>;
      pageCount: number;
    }
    const { toItem, seed, reducers, fixturePath } = setup();
    const [items, context] = await press(fixturePath, toItem, seed, reducers);

    const pipe = makePipe<Directory[], Context>();

    const upper = (dirs: Directory[]): Directory[] =>
      dirs.map((dir) => ({ ...dir, name: dir.name.toUpperCase() }));

    const upNames = ["", "FRENCH-PRESS", "TEA-POT"];

    expect(
      (await pipe(upper)(items, context)).map((dir) => dir.name)
    ).to.deep.equal(upNames);

    const starDashes = (dirs: Directory[]): Directory[] =>
      dirs.map((dir) => ({ ...dir, name: dir.name.replace(/-/g, "*") }));

    const starNames = ["", "FRENCH*PRESS", "TEA*POT"];

    expect(
      (await pipe(upper, starDashes)(items, context)).map((dir) => dir.name)
    ).to.deep.equal(starNames);

    const addContext = (dirs: Directory[], context: Context) =>
      dirs.map((dir, index) => ({
        ...dir,
        extra: `Page ${index + 1} of ${context.pageCount}`,
      }));

    const extra = ["Page 1 of 3", "Page 2 of 3", "Page 3 of 3"];

    expect(
      (await pipe(upper, starDashes, addContext)(items, context)).map(
        (dir) => dir.extra
      )
    ).to.deep.equal(extra);

    const justExtra = (dirs: DirExtra[]) => dirs.map((dir) => dir.extra);

    expect(
      await pipe(upper, starDashes, addContext, justExtra)(items, context)
    ).to.deep.equal(extra);
  });

  it("awaits promises returned by pipeables", async () => {
    interface DirExtra extends Directory {
      extra: string;
    }
    const { toItem, seed, reducers, fixturePath } = setup();
    const [dirs, context] = await press(fixturePath, toItem, seed, reducers);

    const pipe = makePipe<Directory[], Context>();

    const upper = (dirs: Directory[]): Promise<Directory[]> =>
      Promise.resolve(
        dirs.map((dir) => ({ ...dir, name: dir.name.toUpperCase() }))
      );

    const starDashes = (dirs: Directory[]): Directory[] =>
      dirs.map((dir) => ({ ...dir, name: dir.name.replace(/-/g, "*") }));

    const starNames = ["", "FRENCH*PRESS", "TEA*POT"];

    expect(
      (await pipe(upper, starDashes)(dirs, context)).map((dir) => dir.name)
    ).to.deep.equal(starNames);

    const addContext = (dirs: Directory[], context: Context) =>
      Promise.resolve(
        dirs.map((dir, index) => ({
          ...dir,
          extra: `Page ${index + 1} of ${context.pageCount}`,
        }))
      );

    const justExtra = (dirs: DirExtra[]): string[] =>
      dirs.map((dir) => dir.extra);

    const extra = ["Page 1 of 3", "Page 2 of 3", "Page 3 of 3"];

    expect(
      (await pipe(upper, starDashes, addContext)(dirs, context)).map(
        (pg) => pg.extra
      )
    ).to.deep.equal(extra);

    const result = await pipe(
      upper,
      starDashes,
      addContext,
      justExtra
    )(dirs, context);
    expect(result).to.deep.equal(extra);
  });
});
