import Pipeable from "./types/pipeable";
import Pipe from "./types/pipe";
import Directory from "./types/directory";
import Item from "./types/item";

const makePipe = <TStart, TContext = null>(): Pipe<TStart, TContext> => (
  ...pipeables: Array<Pipeable<any, any, TContext>>
) => (start: TStart, context: TContext) =>
  pipeables.reduce<any>(async (previous, pipe) => {
    const piped = pipe(await previous, context);
    return (piped instanceof Promise && piped) || Promise.resolve(piped);
  }, start);

export default makePipe;

export const dirPipe = makePipe<Directory>();

export const compile = <TContext>(context: TContext) =>
  makePipe<Item, TContext>();
