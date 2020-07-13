import Page from "./page";
import Pipeable from "./pipeable";

type P<T, A, B> = Pipeable<T, A, B>;

// prettier-ignore
interface Pipe<T> {
    <A>(p1: P<T, Page[], A>): A;
    <A, B>(p1: P<T, Page[], A>, p2: P<T, A, B>): B;
    <A, B, C>(p1: P<T, Page[], A>, p2: P<T, A, B>, p3: P<T, B, C>): C;
    <A, B, C, D>(p1: P<T, Page[], A>, p2: P<T, A, B>, p3: P<T, B, C>, p4: P<T, C, D>): D;
  }

const asPipe = <TContext>(pages: Page[], context: TContext): Pipe<TContext> => {
  return (...pipeables: Array<Pipeable<TContext, any, any>>): any =>
    pipeables.reduce((acc, p) => p(acc, context), pages);
};

export default asPipe;
