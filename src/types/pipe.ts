import Page from "./page";
import Pipeable from "./pipeable";

type Pi<T, A, B> = Pipeable<T, A, B>;
type Re<T> = T | Promise<T>;
type Pr<T> = Promise<T>;

// prettier-ignore
interface Pipe<T> {
  <A>(p1: Pi<T, Page[], A>): Promise<A>;
  <A, B>(p1: Pi<T, Page[], Re<A>>, p2: Pi<T, A, B>): Pr<B>;
  <A, B, C>(p1: Pi<T, Page[], Re<A>>, p2: Pi<T, A, Re<B>>, p3: Pi<T, B, C>): Pr<C>;
  <A, B, C, D>(p1: Pi<T, Page[], Re<A>>, p2: Pi<T, A, Re<B>>, p3: Pi<T, B, Re<C>>, p4: Pi<T, C, D>): Pr<D>;
  <A, B, C, D, E>(p1: Pi<T, Page[], Re<A>>, p2: Pi<T, A, Re<B>>, p3: Pi<T, B, Re<C>>, p4: Pi<T, C, Re<D>>, p5: Pi<T, D, E>): Pr<E>;
  <A, B, C, D, E, F>(p1: Pi<T, Page[], Re<A>>, p2: Pi<T, A, Re<B>>, p3: Pi<T, B, Re<C>>, p4: Pi<T, C, Re<D>>, p5: Pi<T, D, Re<E>>, p6: Pi<T, E, F>): Pr<F>;
  <A, B, C, D, E, F, G>(p1: Pi<T, Page[], Re<A>>, p2: Pi<T, A, Re<B>>, p3: Pi<T, B, Re<C>>, p4: Pi<T, C, Re<D>>, p5: Pi<T, D, Re<E>>, p6: Pi<T, E, Re<F>>, p7: Pi<T, F, G>): Pr<G>;
  <A, B, C, D, E, F, G, H>(p1: Pi<T, Page[], Re<A>>, p2: Pi<T, A, Re<B>>, p3: Pi<T, B, Re<C>>, p4: Pi<T, C, Re<D>>, p5: Pi<T, D, Re<E>>, p6: Pi<T, E, Re<F>>, p7: Pi<T, F, Re<G>>, p8: Pi<T, G, H>): Pr<H>;
  <A, B, C, D, E, F, G, H, I>(p1: Pi<T, Page[], Re<A>>, p2: Pi<T, A, Re<B>>, p3: Pi<T, B, Re<C>>, p4: Pi<T, C, Re<D>>, p5: Pi<T, D, Re<E>>, p6: Pi<T, E, Re<F>>, p7: Pi<T, F, Re<G>>, p8: Pi<T, G, Re<H>>, p9: Pi<T, H, I>): Pr<I>;
}

export default Pipe;
