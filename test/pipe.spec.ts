import "mocha";
import { expect } from "chai";
import { join } from "path";
import { press, asPipe } from "../src/api";
import Page from "../src/types/page";
import Pipeable from "../src/types/pipeable";

describe("pipe", () => {
  const setup = () => {
    const initial = { names: <string[]>[], pageCount: 0 };
    const reducers = {
      names: (page: Page, previous: string[]) => previous.concat(page.name),
      pageCount: (page: Page, previous: number) => previous + 1,
    };
    const fixturePath = join(__dirname, "fixture");
    return { initial, reducers, fixturePath };
  };

  it("passes pages through any number of pipeables", async () => {
    interface Context {
      names: Array<string>;
      pageCount: number;
    }
    interface PageExtra extends Page {
      extra: string;
    }
    const { initial, reducers, fixturePath } = setup();
    const [pages, context] = await press(fixturePath, initial, reducers);
    const pipe = asPipe(pages, context);

    const upper: Pipeable<Context, Page[], Page[]> = (pages) =>
      pages.map((page) => ({ ...page, name: page.name.toUpperCase() }));

    const starDashes: Pipeable<Context, Page[], Page[]> = (pages) =>
      pages.map((page) => ({ ...page, name: page.name.replace(/-/g, "*") }));

    const addContext: Pipeable<Context, Page[], PageExtra[]> = (
      pages,
      context
    ) =>
      pages.map((page, index) => ({
        ...page,
        extra: `Page ${index + 1} of ${context.pageCount}`,
      }));

    const justExtra: Pipeable<Context, PageExtra[], string[]> = (pages) =>
      pages.map((page) => page.extra);

    const upNames = ["", "FRENCH-PRESS", "TEA-POT"];
    const starNames = ["", "FRENCH*PRESS", "TEA*POT"];
    const extra = ["Page 1 of 3", "Page 2 of 3", "Page 3 of 3"];

    expect((await pipe(upper)).map((page) => page.name)).to.deep.equal(upNames);

    expect(
      (await pipe(upper, starDashes)).map((page) => page.name)
    ).to.deep.equal(starNames);

    expect(
      (await pipe(upper, starDashes, addContext)).map((pg) => pg.extra)
    ).to.deep.equal(extra);

    expect(await pipe(upper, starDashes, addContext, justExtra)).to.deep.equal(
      extra
    );
  });

  it("awaits promises returned by pipeables", async () => {
    interface Context {
      names: Array<string>;
      pageCount: number;
    }
    interface PageExtra extends Page {
      extra: string;
    }
    const { initial, reducers, fixturePath } = setup();
    const [pages, context] = await press(fixturePath, initial, reducers);
    const pipe = asPipe(pages, context);

    const upper: Pipeable<Context, Page[], Promise<Page[]>> = (pages) =>
      Promise.resolve(
        pages.map((page) => ({ ...page, name: page.name.toUpperCase() }))
      );

    const starDashes: Pipeable<Context, Page[], Page[]> = (pages) =>
      pages.map((page) => ({ ...page, name: page.name.replace(/-/g, "*") }));

    const addContext: Pipeable<Context, Page[], Promise<PageExtra[]>> = (
      pages,
      context
    ) =>
      Promise.resolve(
        pages.map((page, index) => ({
          ...page,
          extra: `Page ${index + 1} of ${context.pageCount}`,
        }))
      );

    const justExtra: Pipeable<Context, PageExtra[], string[]> = (pages) =>
      pages.map((page) => page.extra);

    const upNames = ["", "FRENCH-PRESS", "TEA-POT"];
    const starNames = ["", "FRENCH*PRESS", "TEA*POT"];
    const extra = ["Page 1 of 3", "Page 2 of 3", "Page 3 of 3"];

    expect((await pipe(upper)).map((page) => page.name)).to.deep.equal(upNames);

    expect(
      (await pipe(upper, starDashes)).map((page) => page.name)
    ).to.deep.equal(starNames);

    expect(
      (await pipe(upper, starDashes, addContext)).map((pg) => pg.extra)
    ).to.deep.equal(extra);

    expect(await pipe(upper, starDashes, addContext, justExtra)).to.deep.equal(
      extra
    );
  });
});
