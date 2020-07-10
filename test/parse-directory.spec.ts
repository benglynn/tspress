import "mocha";
import { expect } from "chai";
import { join } from "path";
import { press } from "../src/api";
import Page from "../src/page";
import pressed from "./expected/pressed";
import pressedWithReducers from "./expected/pressed-with-reducers";

describe("parseDirectory", () => {
  it("should return each directory", () => {
    const pages = press(join(__dirname, "fixture"), {}, {});
    expect(pages).to.deep.equal(pressed);
  });

  it("should accept reducers", () => {
    const dir = join(__dirname, "fixture");
    const initial = { names: <string[]>[], pageCount: 0 };
    const reducers = {
      names: (page: Page, previous: string[]) => previous.concat(page.name),
      pageCount: (page: Page, previous: number) => previous + 1,
    };
    const pages = press(dir, initial, reducers);
    expect(pages).to.deep.equal(pressedWithReducers);
  });
});
