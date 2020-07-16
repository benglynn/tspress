interface ContextPipeable<TContext, I, O> {
  (input: I, context: TContext): O;
}

export default ContextPipeable;
