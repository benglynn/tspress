interface Pipeable<I, O, C> {
  (input: I, context: C): O | Promise<O>;
}

export default Pipeable;
