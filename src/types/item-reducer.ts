import Directory from "./directory";

interface ItemReducer<TItem, TSlice> {
  (item: TItem, previous: TSlice): TSlice | Promise<TSlice>;
}

export default ItemReducer;
