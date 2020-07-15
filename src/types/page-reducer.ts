import Page from "./page";

interface PageReducer<T> {
  (page: Page, previous: T): T | Promise<T>;
}

export default PageReducer;
