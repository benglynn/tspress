import Pipeable from "./pipeable";

type Pi<A, B> = Pipeable<A, B>;
type R<T> = T | Promise<T>;
type Pr<T> = Promise<T>;

// prettier-ignore
interface Pipe<TStart, TEnd, TContext> {
  (p1: Pi<TStart, R<TEnd>>): (start: TStart, context: TContext) => Pr<TEnd>;
  <A>(p1: Pi<TStart, R<A>>, p2: Pi<A, R<TEnd>>): (start: TStart, context: TContext) => Pr<TEnd>;
  <A, B>(p1: Pi<TStart, R<A>>, p2: Pi<A, R<B>>, p3: Pi<B, R<TEnd>>): (start: TStart, context: TContext) => Pr<TEnd>;
  <A, B, C>(p1: Pi<TStart, R<A>>, p2: Pi<A, R<B>>, p3: Pi<B, R<C>>, p4: Pi<C, R<TEnd>>): (start: TStart, context: TContext) => Pr<TEnd>;
  <A, B, C, D>(p1: Pi<TStart, R<A>>, p2: Pi<A, R<B>>, p3: Pi<B, R<C>>, p4: Pi<C, R<D>>, p5: Pi<D, R<TEnd>>): (start: TStart, context: TContext) => Pr<TEnd>;
  <A, B, C, D, E>(p1: Pi<TStart, R<A>>, p2: Pi<A, R<B>>, p3: Pi<B, R<C>>, p4: Pi<C, R<D>>, p5: Pi<D, R<E>>, p6: Pi<E, R<TEnd>>): (start: TStart, context: TContext) => Pr<TEnd>;
  <A, B, C, D, E, F>(p1: Pi<TStart, R<A>>, p2: Pi<A, R<B>>, p3: Pi<B, R<C>>, p4: Pi<C, R<D>>, p5: Pi<D, R<E>>, p6: Pi<E, R<F>>, p7: Pi<F, R<TEnd>>): (start: TStart, context: TContext) => Pr<TEnd>;
  <A, B, C, D, E, F, G>(p1: Pi<TStart, R<A>>, p2: Pi<A, R<B>>, p3: Pi<B, R<C>>, p4: Pi<C, R<D>>, p5: Pi<D, R<E>>, p6: Pi<E, R<F>>, p7: Pi<F, R<G>>, p8: Pi<G, R<TEnd>>): (start: TStart, context: TContext) => Pr<TEnd>;
  <A, B, C, D, E, F, G, H>(p1: Pi<TStart, R<A>>, p2: Pi<A, R<B>>, p3: Pi<B, R<C>>, p4: Pi<C, R<D>>, p5: Pi<D, R<E>>, p6: Pi<E, R<F>>, p7: Pi<F, R<G>>, p8: Pi<G, R<H>>, p9: Pi<H, R<TEnd>>): (start: TStart, context: TContext) => Pr<TEnd>;
}

export default Pipe;
