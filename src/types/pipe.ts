import Pipeable from "./pipeable";

type Pi<A, B> = Pipeable<A, B>;
type R<T> = T | Promise<T>;
type Pr<T> = Promise<T>;

// prettier-ignore
interface Pipe<TStart> {
  <A>(p1: Pi<TStart, A>): () => Pr<A>;
  <A, B>(p1: Pi<TStart, R<A>>, p2: Pi<A, B>): () => Pr<B>;
  <A, B, C>(p1: Pi<TStart, R<A>>, p2: Pi<A, R<B>>, p3: Pi<B, C>): () => Pr<C>;
  <A, B, C, D>(p1: Pi<TStart, R<A>>, p2: Pi<A, R<B>>, p3: Pi<B, R<C>>, p4: Pi<C, D>): () => Pr<D>;
  <A, B, C, D, E>(p1: Pi<TStart, R<A>>, p2: Pi<A, R<B>>, p3: Pi<B, R<C>>, p4: Pi<C, R<D>>, p5: Pi<D, E>): () => Pr<E>;
  <A, B, C, D, E, F>(p1: Pi<TStart, R<A>>, p2: Pi<A, R<B>>, p3: Pi<B, R<C>>, p4: Pi<C, R<D>>, p5: Pi<D, R<E>>, p6: Pi<E, F>): () => Pr<F>;
  <A, B, C, D, E, F, G>(p1: Pi<TStart, R<A>>, p2: Pi<A, R<B>>, p3: Pi<B, R<C>>, p4: Pi<C, R<D>>, p5: Pi<D, R<E>>, p6: Pi<E, R<F>>, p7: Pi<F, G>): () => Pr<G>;
  <A, B, C, D, E, F, G, H>(p1: Pi<TStart, R<A>>, p2: Pi<A, R<B>>, p3: Pi<B, R<C>>, p4: Pi<C, R<D>>, p5: Pi<D, R<E>>, p6: Pi<E, R<F>>, p7: Pi<F, R<G>>, p8: Pi<G, H>): () => Pr<H>;
  <A, B, C, D, E, F, G, H, I>(p1: Pi<TStart, R<A>>, p2: Pi<A, R<B>>, p3: Pi<B, R<C>>, p4: Pi<C, R<D>>, p5: Pi<D, R<E>>, p6: Pi<E, R<F>>, p7: Pi<F, R<G>>, p8: Pi<G, R<H>>, p9: Pi<H, I>): () => Pr<I>;
}

export default Pipe;
