import Page from "./page";

interface ItemReducer<TItem, TSlice> {
  (page: TItem, previous: TSlice): TSlice | Promise<TSlice>;
}

export default ItemReducer;
