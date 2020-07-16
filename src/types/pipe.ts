import Pipeable from "./pipeable";

type Pi<A, B> = Pipeable<A, B>;
type R<T> = T | Promise<T>;
type Pr<T> = Promise<T>;

// prettier-ignore
interface Pipe<TStart, TContext> {
  <A>(p1: Pi<TStart, R<A>>): (start: TStart, context: TContext) => Pr<A>;
  <A, B>(p1: Pi<TStart, R<A>>, p2: Pi<A, R<B>>): (start: TStart, context: TContext) => Pr<B>;
  <A, B, C>(p1: Pi<TStart, R<A>>, p2: Pi<A, R<B>>, p3: Pi<B, R<C>>): (start: TStart, context: TContext) => Pr<C>;
  <A, B, C, D>(p1: Pi<TStart, R<A>>, p2: Pi<A, R<B>>, p3: Pi<B, R<C>>, p4: Pi<C, R<D>>): (start: TStart, context: TContext) => Pr<D>;
  <A, B, C, D,E>(p1: Pi<TStart, R<A>>, p2: Pi<A, R<B>>, p3: Pi<B, R<C>>, p4: Pi<C, R<D>>, p5: Pi<D, R<E>>): (start: TStart, context: TContext) => Pr<E>;
  <A, B, C, D, E, F>(p1: Pi<TStart, R<A>>, p2: Pi<A, R<B>>, p3: Pi<B, R<C>>, p4: Pi<C, R<D>>, p5: Pi<D, R<E>>, p6: Pi<E, R<F>>): (start: TStart, context: TContext) => Pr<F>;
  <A, B, C, D, E, F, G>(p1: Pi<TStart, R<A>>, p2: Pi<A, R<B>>, p3: Pi<B, R<C>>, p4: Pi<C, R<D>>, p5: Pi<D, R<E>>, p6: Pi<E, R<F>>, p7: Pi<F, R<G>>): (start: TStart, context: TContext) => Pr<G>;
  <A, B, C, D, E, F, G, H>(p1: Pi<TStart, R<A>>, p2: Pi<A, R<B>>, p3: Pi<B, R<C>>, p4: Pi<C, R<D>>, p5: Pi<D, R<E>>, p6: Pi<E, R<F>>, p7: Pi<F, R<G>>, p8: Pi<G, R<H>>): (start: TStart, context: TContext) => Pr<H>;
  <A, B, C, D, E, F, G, H, I>(p1: Pi<TStart, R<A>>, p2: Pi<A, R<B>>, p3: Pi<B, R<C>>, p4: Pi<C, R<D>>, p5: Pi<D, R<E>>, p6: Pi<E, R<F>>, p7: Pi<F, R<G>>, p8: Pi<G, R<H>>, p9: Pi<H, R<I>>): (start: TStart, context: TContext) => Pr<I>;
}

export default Pipe;
