import "mocha";
import { expect } from "chai";
import { join } from "path";
import { press, makePipe } from "../src/api";
import Page from "../src/types/page";
import pressed from "./expected/pressed";

describe("press", () => {
  interface PageExtra extends Page {
    extra: string;
  }

  const setup = () => {
    const items: Page[] = [];
    const toItem = (page: Page) => page;
    const seed = { names: <string[]>[], pageCount: 0 };
    const reducers = {
      names: (page: Page, previous: string[]) => previous.concat(page.name),
      pageCount: (page: Page, previous: number) => previous + 1,
    };
    const fixturePath = join(__dirname, "fixture");
    return { items, toItem, seed, reducers, fixturePath };
  };

  it("should parse each directory", async () => {
    const { toItem, fixturePath } = setup();
    const [pages] = await press(fixturePath, [], toItem, {}, {});
    expect(pages).to.deep.equal(pressed);
  });

  it("should fold context with reducers", async () => {
    const { items, toItem, seed, reducers, fixturePath } = setup();
    const [pages, context] = await press(
      fixturePath,
      items,
      toItem,
      seed,
      reducers
    );
    expect(pages).to.deep.equal(pressed);
    expect(context).to.deep.equal({
      names: ["", "french-press", "tea-pot"],
      pageCount: 3,
    });
  });

  it("should fold context with async reducers", async () => {
    const { items, toItem, seed, fixturePath } = setup();
    const asyncReducers = {
      names: (page: Page, previous: string[]) =>
        Promise.resolve(previous.concat(page.name)),
      pageCount: (page: Page, previous: number) =>
        Promise.resolve(previous + 1),
    };
    const [pages, context] = await press(
      fixturePath,
      items,
      toItem,
      seed,
      asyncReducers
    );
    expect(pages).to.deep.equal(pressed);
    expect(context).to.deep.equal({
      names: ["", "french-press", "tea-pot"],
      pageCount: 3,
    });
  });

  it("transforms each page", async () => {
    const { fixturePath } = setup();
    const toItem = (page: Page): PageExtra => ({ ...page, extra: "sauce" });
    const [pages] = await press(fixturePath, [], toItem, {}, {});
    const expected = ["sauce", "sauce", "sauce"];
    expect(pages.map((page) => page.extra)).to.deep.equal(expected);
  });

  it("transforms pages with a pipe", async () => {
    const { fixturePath } = setup();
    const pipeable = (page: Page): PageExtra => ({ ...page, extra: "pipe" });
    const pipe = makePipe<Page, null>()(pipeable);
    const [pages] = await press(fixturePath, [], pipe, {}, {});
    const expected = ["pipe", "pipe", "pipe"];
    expect(pages.map((page) => page.extra)).to.deep.equal(expected);
  });

  it("transforms pages with an async pipe", async () => {
    const { fixturePath } = setup();
    const pipeable = (page: Page): Promise<PageExtra> =>
      Promise.resolve({ ...page, extra: "async pipe" });
    const pipe = makePipe<Page, null>()(pipeable);
    const [pages] = await press(fixturePath, [], pipe, {}, {});
    const expected = ["async pipe", "async pipe", "async pipe"];
    expect(pages.map((page) => page.extra)).to.deep.equal(expected);
  });
});
