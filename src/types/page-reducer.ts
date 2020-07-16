import Page from "./page";

interface PageReducer<TItem, TSlice> {
  (page: TItem, previous: TSlice): TSlice | Promise<TSlice>;
}

export default PageReducer;
