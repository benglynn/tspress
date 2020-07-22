/**
 * When pressed, item reducers reduce a slice of context in parallel.
 */
interface ItemReducer<TItem, TSlice> {
  (item: TItem, previous: TSlice): TSlice | Promise<TSlice>;
}

export default ItemReducer;
