/**
 * A component of a Pipe used to transform the data that passes through.
 */
interface Pipeable<TIn, TOut, TContext = null> {
  (input: TIn, context: TContext): TOut | Promise<TOut>;
}

export default Pipeable;
