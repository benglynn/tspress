interface Pipeable<TContext, I, O> {
  (input: I, context: TContext): O;
}

export default Pipeable;
