import api from "./api";
import { expect } from "chai";
import "mocha";

describe("the api", () => {
    it("should return a message", () => {
        expect(api()).to.equal("Hello from module");
    });
})