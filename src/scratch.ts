interface Page {
  name: string;
}

interface Context {
  count: number;
}

interface HasAdded {
  added: string;
}

interface Pipeable<T, I, O> {
  (ctx: T, input: I, index: number): O;
}

// prettier-ignore
interface Pipe<T> {
  <A>(p1: Pipeable<T, Page[], A>): A;
  <A, B>(p1: Pipeable<T, Page[], A>, p2: Pipeable<T, A, B>): B;
  <A, B, C>(p1: Pipeable<T, Page[], A>, p2: Pipeable<T, A, B>, p3: Pipeable<T, B, C>): C;
  <A, B, C, D>(p1: Pipeable<T, Page[], A>, p2: Pipeable<T, A, B>, p3: Pipeable<T, B, C>, p4: Pipeable<T, C, D>): D;
}

function asPipe<T>(context: T, pages: Page[]) {
  const pipe: Pipe<T> = (...pipeables: Array<Pipeable<T, any, any>>): any => {
    return pipeables.reduce((acc, tx, index) => tx(context, acc, index), pages);
  };
  return pipe;
}

const pages: Page[] = [{ name: "first" }];

const ctx: Context = { count: 2 };

const addProperty = (ctx: Context, pages: Page[]): (Page & HasAdded)[] =>
  pages.map((page) => ({ ...page, added: "added property" }));

const changeProperty = (
  ctx: Context,
  pages: (Page & HasAdded)[]
): (Page & HasAdded)[] =>
  pages.map((page) => ({
    ...page,
    added: page.added + "!",
  }));

const removeProperty = (ctx: Context, pages: (Page & HasAdded)[]): Page[] =>
  pages.map((page) => ({ name: page.name }));

const pipe = asPipe(ctx, pages);
const nt1 = pipe(addProperty);
const nt2 = pipe(addProperty, removeProperty);
const nt3 = pipe(addProperty, changeProperty, removeProperty);
const nt4 = pipe(addProperty, changeProperty, removeProperty, addProperty);
