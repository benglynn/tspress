import Pipeable from "./pipeable";

type Pi<I, O, C> = Pipeable<I, O, C>;
type R<T> = T | Promise<T>;
type Pr<T> = Promise<T>;

/**
 * Overloads ensure that pipeables in a Pipe each works on the output of the
 * last. Pipes are used in press to pipe Directories into Items, and in
 * compilation to pipe Items into HTML.
 */
// prettier-ignore
interface Pipe<TStart, TContext> {
  <A>(p1: Pi<TStart, R<A>, TContext>): (start: TStart, context: TContext) => Pr<A>;
  <A, B>(p1: Pi<TStart, R<A>, TContext>, p2: Pi<A, R<B>, TContext>): (start: TStart, context: TContext) => Pr<B>;
  <A, B, C>(p1: Pi<TStart, R<A>, TContext>, p2: Pi<A, R<B>, TContext>, p3: Pi<B, R<C>, TContext>): (start: TStart, context: TContext) => Pr<C>;
  <A, B, C, D>(p1: Pi<TStart, R<A>, TContext>, p2: Pi<A, R<B>, TContext>, p3: Pi<B, R<C>, TContext>, p4: Pi<C, R<D>, TContext>): (start: TStart, context: TContext) => Pr<D>;
  <A, B, C, D,E>(p1: Pi<TStart, R<A>, TContext>, p2: Pi<A, R<B>, TContext>, p3: Pi<B, R<C>, TContext>, p4: Pi<C, R<D>, TContext>, p5: Pi<D, R<E>, TContext>): (start: TStart, context: TContext) => Pr<E>;
  <A, B, C, D, E, F>(p1: Pi<TStart, R<A>, TContext>, p2: Pi<A, R<B>, TContext>, p3: Pi<B, R<C>, TContext>, p4: Pi<C, R<D>, TContext>, p5: Pi<D, R<E>, TContext>, p6: Pi<E, R<F>, TContext>): (start: TStart, context: TContext) => Pr<F>;
  <A, B, C, D, E, F, G>(p1: Pi<TStart, R<A>, TContext>, p2: Pi<A, R<B>, TContext>, p3: Pi<B, R<C>, TContext>, p4: Pi<C, R<D>, TContext>, p5: Pi<D, R<E>, TContext>, p6: Pi<E, R<F>, TContext>, p7: Pi<F, R<G>, TContext>): (start: TStart, context: TContext) => Pr<G>;
  <A, B, C, D, E, F, G, H>(p1: Pi<TStart, R<A>, TContext>, p2: Pi<A, R<B>, TContext>, p3: Pi<B, R<C>, TContext>, p4: Pi<C, R<D>, TContext>, p5: Pi<D, R<E>, TContext>, p6: Pi<E, R<F>, TContext>, p7: Pi<F, R<G>, TContext>, p8: Pi<G, R<H>, TContext>): (start: TStart, context: TContext) => Pr<H>;
  <A, B, C, D, E, F, G, H, I>(p1: Pi<TStart, R<A>, TContext>, p2: Pi<A, R<B>, TContext>, p3: Pi<B, R<C>, TContext>, p4: Pi<C, R<D>, TContext>, p5: Pi<D, R<E>, TContext>, p6: Pi<E, R<F>, TContext>, p7: Pi<F, R<G>, TContext>, p8: Pi<G, R<H>, TContext>, p9: Pi<H, R<I>, TContext>): (start: TStart, context: TContext) => Pr<I>;
}

export default Pipe;
