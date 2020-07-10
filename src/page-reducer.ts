import Page from "./page";

type PageReducer<T> = (page: Page, previous: T) => T;

export default PageReducer;
