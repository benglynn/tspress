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
    it("should parse each directory", () => {
      const [pages] = press(join(__dirname, "fixture"), {}, {});
      expect(pages).to.deep.equal(pressed);
    });

    it("should fold context with reducers", () => {
      const { initial, reducers, fixturePath } = setup();
      const [pages, context] = press(fixturePath, initial, reducers);
      expect(pages).to.deep.equal(pressed);
      expect(context).to.deep.equal({
        names: ["", "french-press", "tea-pot"],
        pageCount: 3,
      });
    });
  });

  describe("asPipe", () => {
    it("creates a pipe that transforms through pipeables", () => {
      interface Context {
        names: Array<string>;
        pageCount: number;
      }
      interface PageExtra extends Page {
        extra: string;
      }
      const { initial, reducers, fixturePath } = setup();
      const pipe = asPipe(...press(fixturePath, initial, reducers));

      const uppercase: P<Context, Page[], Page[]> = (pages) =>
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
      expect(pipe(uppercase).map((page) => page.name)).to.deep.equal(upNames);

      const starNames = ["", "FRENCH*PRESS", "TEA*POT"];
      expect(
        pipe(uppercase, starDashes).map((page) => page.name)
      ).to.deep.equal(starNames);

      const extra = ["Page 1 of 3", "Page 2 of 3", "Page 3 of 3"];
      expect(
        pipe(uppercase, starDashes, addContext).map((page) => page.extra)
      ).to.deep.equal(extra);

      expect(pipe(uppercase, starDashes, addContext, justExtra)).to.deep.equal(
        extra
      );
    });
  });
});