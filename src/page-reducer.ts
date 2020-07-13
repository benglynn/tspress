import Page from "./page";

interface PageReducer<TReduced> {
  (page: Page, previous: TReduced): TReduced;
}

export default PageReducer;
