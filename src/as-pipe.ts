import Page from "./page";
import Pipeable from "./pipeable";

type P<T, A, B> = Pipeable<T, A, B>;
type R<T> = T | Promise<T>;

// prettier-ignore
interface Pipe<T> {
  <A>(p1: P<T, Page[], A>): Promise<A>;
  <A, B>(p1: P<T, Page[], R<A>>, p2: P<T, A, B>): Promise<B>;
  <A, B, C>(p1: P<T, Page[], R<A>>, p2: P<T, A, R<B>>, p3: P<T, B, C>): Promise<C>;
  <A, B, C, D>(p1: P<T, Page[], R<A>>, p2: P<T, A, R<B>>, p3: P<T, B, R<C>>, p4: P<T, C, D>): Promise<D>;
}

const asPipe = <TContext>(pages: Page[], context: TContext): Pipe<TContext> => {
  return (...pipeables: Array<Pipeable<TContext, any, any>>): Promise<any> =>
    pipeables.reduce<any>(async (previous, pipe) => {
      const piped = pipe(await previous, context);
      return (piped instanceof Promise && piped) || Promise.resolve(piped);
    }, pages);
};
export default asPipe;
