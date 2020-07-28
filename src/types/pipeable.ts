interface Pipeable<TInOut, TContext> {
  (page: TInOut, context: TContext): TInOut | Promise<TInOut>;
}

export default Pipeable;
