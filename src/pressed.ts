import Page from "./page";

export interface Pressed<T> {
  pages: Page[];
  reduced: T;
}

export default Pressed;
