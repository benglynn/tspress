import "mocha";
import { expect } from "chai";
import { join } from "path";
import { press, asPipe } from "../src/api";
import Page from "../src/types/page";
import pressed from "./expected/pressed";
import P from "../src/types/context-pipeable";

interface Context {
  names: Array<string>;
  pageCount: number;
}

describe("press", () => {
  const setup = () => {
    const items: Page[] = [];
    const seed = { names: <string[]>[], pageCount: 0 };
    const reducers = {
      names: (page: Page, previous: string[]) => previous.concat(page.name),
      pageCount: (page: Page, previous: number) => previous + 1,
    };
    const fixturePath = join(__dirname, "fixture");
    return { items, seed, reducers, fixturePath };
  };

  describe("parse", () => {
    it("should parse each directory", async () => {
      const [pages] = await press(join(__dirname, "fixture"), [], {}, {});
      expect(pages).to.deep.equal(pressed);
    });

    it("should fold context with reducers", async () => {
      const { items, seed, reducers, fixturePath } = setup();
      const [pages, context] = await press(fixturePath, items, seed, reducers);
      expect(pages).to.deep.equal(pressed);
      expect(context).to.deep.equal({
        names: ["", "french-press", "tea-pot"],
        pageCount: 3,
      });
    });

    it("should fold context with async reducers", async () => {
      const { items, seed, fixturePath } = setup();
      const asyncReducers = {
        names: (page: Page, previous: string[]) =>
          Promise.resolve(previous.concat(page.name)),
        pageCount: (page: Page, previous: number) =>
          Promise.resolve(previous + 1),
      };
      const [pages, context] = await press(
        fixturePath,
        items,
        seed,
        asyncReducers
      );
      expect(pages).to.deep.equal(pressed);
      expect(context).to.deep.equal({
        names: ["", "french-press", "tea-pot"],
        pageCount: 3,
      });
    });
  });

  describe("asPipe", () => {
    it("returns a function", async () => {
      expect(asPipe([], {})).to.be.a("function");
    });
  });

  describe("pipe", () => {
    it("passes pages through any number of pipeables", async () => {
      interface Context {
        names: Array<string>;
        pageCount: number;
      }
      interface PageExtra extends Page {
        extra: string;
      }
      const { items, seed, reducers, fixturePath } = setup();
      const [pages, context] = await press(fixturePath, items, seed, reducers);
      const pipe = asPipe(pages, context);

      const upper: P<Context, Page[], Page[]> = (pages) =>
        pages.map((page) => ({ ...page, name: page.name.toUpperCase() }));

      const starDashes: P<Context, Page[], Page[]> = (pages) =>
        pages.map((page) => ({ ...page, name: page.name.replace(/-/g, "*") }));

      const addContext: P<Context, Page[], PageExtra[]> = (pages, context) =>
        pages.map((page, index) => ({
          ...page,
          extra: `Page ${index + 1} of ${context.pageCount}`,
        }));

      const justExtra: P<Context, PageExtra[], string[]> = (pages) =>
        pages.map((page) => page.extra);

      const upNames = ["", "FRENCH-PRESS", "TEA-POT"];
      const starNames = ["", "FRENCH*PRESS", "TEA*POT"];
      const extra = ["Page 1 of 3", "Page 2 of 3", "Page 3 of 3"];

      expect((await pipe(upper)()).map((page) => page.name)).to.deep.equal(
        upNames
      );

      expect(
        (await pipe(upper, starDashes)()).map((page) => page.name)
      ).to.deep.equal(starNames);

      expect(
        (await pipe(upper, starDashes, addContext)()).map((pg) => pg.extra)
      ).to.deep.equal(extra);

      expect(
        await pipe(upper, starDashes, addContext, justExtra)()
      ).to.deep.equal(extra);
    });

    it("awaits promises returned by pipeables", async () => {
      interface PageExtra extends Page {
        extra: string;
      }
      const { items, seed, reducers, fixturePath } = setup();
      const [pages, context] = await press(fixturePath, items, seed, reducers);
      const pipe = asPipe(pages, context);

      const upper: P<Context, Page[], Promise<Page[]>> = (pages) =>
        Promise.resolve(
          pages.map((page) => ({ ...page, name: page.name.toUpperCase() }))
        );

      const starDashes: P<Context, Page[], Page[]> = (pages) =>
        pages.map((page) => ({ ...page, name: page.name.replace(/-/g, "*") }));

      const addContext: P<Context, Page[], Promise<PageExtra[]>> = (
        pages,
        context
      ) =>
        Promise.resolve(
          pages.map((page, index) => ({
            ...page,
            extra: `Page ${index + 1} of ${context.pageCount}`,
          }))
        );

      const justExtra: P<Context, PageExtra[], string[]> = (pages) =>
        pages.map((page) => page.extra);

      const upNames = ["", "FRENCH-PRESS", "TEA-POT"];
      const starNames = ["", "FRENCH*PRESS", "TEA*POT"];
      const extra = ["Page 1 of 3", "Page 2 of 3", "Page 3 of 3"];

      expect((await pipe(upper)()).map((page) => page.name)).to.deep.equal(
        upNames
      );

      expect(
        (await pipe(upper, starDashes)()).map((page) => page.name)
      ).to.deep.equal(starNames);

      expect(
        (await pipe(upper, starDashes, addContext)()).map((pg) => pg.extra)
      ).to.deep.equal(extra);

      expect(
        await pipe(upper, starDashes, addContext, justExtra)()
      ).to.deep.equal(extra);
    });
  });
});
