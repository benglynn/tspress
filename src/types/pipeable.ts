interface Pipeable<I, O> {
  (input: I, ...rest: any): O;
}

export default Pipeable;
