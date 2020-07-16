interface Pipeable<I, O> {
  (input: I, ...rest: any): O | Promise<O>;
}

export default Pipeable;
