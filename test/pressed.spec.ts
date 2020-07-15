import "mocha";
import { expect } from "chai";
import { join } from "path";
import { press, asPipe } from "../src/api";
import Page from "../src/page";
import pressed from "./expected/pressed";
import { default as P } from "../src/pipeable";

describe("press", () => {
  const setup = () => {
    const initial = { names: <string[]>[], pageCount: 0 };
    const reducers = {
      names: (page: Page, previous: string[]) => previous.concat(page.name),
      pageCount: (page: Page, previous: number) => previous + 1,
    };
    const fixturePath = join(__dirname, "fixture");
    return { initial, reducers, fixturePath };
  };

  describe("parse", () => {
    it("should parse each directory", async () => {
      const [pages] = await press(join(__dirname, "fixture"), {}, {});
      expect(pages).to.deep.equal(pressed);
    });

    it("should fold context with reducers", async () => {
      const { initial, reducers, fixturePath } = setup();
      const [pages, context] = await press(fixturePath, initial, reducers);
      expect(pages).to.deep.equal(pressed);
      expect(context).to.deep.equal({
        names: ["", "french-press", "tea-pot"],
        pageCount: 3,
      });
    });

    it("should fold context with async reducers", async () => {
      const { initial, reducers, fixturePath } = setup();
      const asyncReducers = {
        names: (page: Page, previous: string[]) =>
          Promise.resolve(previous.concat(page.name)),
        pageCount: (page: Page, previous: number) =>
          Promise.resolve(previous + 1),
      };
      const [pages, context] = await press(fixturePath, initial, asyncReducers);
      expect(pages).to.deep.equal(pressed);
      expect(context).to.deep.equal({
        names: ["", "french-press", "tea-pot"],
        pageCount: 3,
      });
    });
  });

  describe("asPipe", () => {
    it("creates a pipe that transforms through pipeables", async () => {
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

      expect((await pipe(upper)).map((page) => page.name)).to.deep.equal(
        upNames
      );

      expect(
        (await pipe(upper, starDashes)).map((page) => page.name)
      ).to.deep.equal(starNames);

      expect(
        (await pipe(upper, starDashes, addContext)).map((pg) => pg.extra)
      ).to.deep.equal(extra);

      expect(
        await pipe(upper, starDashes, addContext, justExtra)
      ).to.deep.equal(extra);
    });
  });
});
