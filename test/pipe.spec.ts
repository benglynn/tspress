import "mocha";
import { expect } from "chai";
import pipe from "../src/pipe";

describe("pipe", () => {
  it("pipes data through pipeables", async () => {
    const p1 = (str: string) => str + "-1";
    const p2 = (str: string) => str + "-2";
    const p3 = (str: string) => str + "-3";
    expect(await pipe(p1, p2, p3)("in", null)).to.equal("in-1-2-3");
  });

  it("pipes data through async pipeables", async () => {
    const p1 = (str: string) => Promise.resolve(str + "-a");
    const p2 = (str: string) => Promise.resolve(str + "-b");
    const p3 = (str: string) => Promise.resolve(str + "-c");
    expect(await pipe(p1, p2, p3)("in", null)).to.equal("in-a-b-c");
  });

  it("pipes data through sync and async pipeables", async () => {
    const p1 = (str: string) => Promise.resolve(str + "-async");
    const p2 = (str: string) => str + "-sync";
    const p3 = (str: string) => Promise.resolve(str + "-async");
    expect(await pipe(p1, p2, p3)("in", null)).to.equal("in-async-sync-async");
  });

  it("passes context to each pipeable", async () => {
    type C = { 0: string; 1: string; 2: string };
    const p1 = (str: string, ctx: C) => str + `-${ctx[0]}`;
    const p2 = (str: string, ctx: C) => Promise.resolve(str + `-${ctx[1]}`);
    const p3 = (str: string, ctx: C) => str + `-${ctx[2]}`;
    expect(await pipe(p1, p2, p3)("in", ["x", "y", "z"])).to.equal("in-x-y-z");
  });
});
