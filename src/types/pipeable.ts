interface Pipeable<TPage, TContext> {
  (page: TPage, context: TContext): TPage | Promise<TPage>;
}

export default Pipeable;
