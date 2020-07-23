interface Reducer<TPage, TSlice> {
  (page: TPage, previous: TSlice): TSlice | Promise<TSlice>;
}

export default Reducer;
