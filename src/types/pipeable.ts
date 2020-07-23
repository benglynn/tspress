interface Pipeable<TItem, TContext> {
  (item: TItem, context: TContext): TItem | Promise<TItem>;
}

export default Pipeable;
