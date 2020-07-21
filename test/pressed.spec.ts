import "mocha";
import { expect } from "chai";
import { join } from "path";
import { press, makePipe } from "../src/api";
import Page from "../src/types/page";

describe("press", () => {
  interface PageExtra extends Page {
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
    const toItem = (page: Page) => page;
    const seed = { names: <string[]>[], pageCount: 0 };
    const reducers = {
      names: (page: Page, previous: string[]) => previous.concat(page.name),
      pageCount: (page: Page, previous: number) => previous + 1,
    };
    const fixturePath = join(__dirname, "fixture");
    return { toItem, seed, reducers, fixturePath };
  };

  it("should parse each directory", async () => {
    const { toItem, fixturePath } = setup();
    const [pages] = await press(fixturePath, toItem, {}, {});
    expect(pages).to.deep.equal(expected);
  });

  it("should fold context with reducers", async () => {
    const { toItem, seed, reducers, fixturePath } = setup();
    const [pages, context] = await press(fixturePath, toItem, seed, reducers);
    expect(pages).to.deep.equal(expected);
    expect(context).to.deep.equal({
      names: ["", "french-press", "tea-pot"],
      pageCount: 3,
    });
  });

  it("should fold context with async reducers", async () => {
    const { toItem, seed, fixturePath } = setup();
    const reducers = {
      names: (page: Page, previous: string[]) =>
        Promise.resolve(previous.concat(page.name)),
      pageCount: (page: Page, previous: number) =>
        Promise.resolve(previous + 1),
    };
    const [pages, context] = await press(fixturePath, toItem, seed, reducers);
    expect(pages).to.deep.equal(expected);
    expect(context).to.deep.equal({
      names: ["", "french-press", "tea-pot"],
      pageCount: 3,
    });
  });

  it("transforms each page", async () => {
    const { fixturePath } = setup();
    const toItem = (page: Page): PageExtra => ({ ...page, extra: "sauce" });
    const [pages] = await press(fixturePath, toItem, {}, {});
    const expected = ["sauce", "sauce", "sauce"];
    expect(pages.map((page) => page.extra)).to.deep.equal(expected);
  });

  it("transforms pages with a pipe", async () => {
    const { fixturePath } = setup();
    const pipeable = (page: Page): PageExtra => ({ ...page, extra: "pipe" });
    const pipe = makePipe<Page, null>()(pipeable);
    const [pages] = await press(fixturePath, pipe, {}, {});
    const expected = ["pipe", "pipe", "pipe"];
    expect(pages.map((page) => page.extra)).to.deep.equal(expected);
  });

  it("transforms pages with an async pipe", async () => {
    const { fixturePath } = setup();
    const pipeable = (page: Page): Promise<PageExtra> =>
      Promise.resolve({ ...page, extra: "async pipe" });
    const pipe = makePipe<Page, null>()(pipeable);
    const [pages] = await press(fixturePath, pipe, {}, {});
    const expected = ["async pipe", "async pipe", "async pipe"];
    expect(pages.map((page) => page.extra)).to.deep.equal(expected);
  });
});
