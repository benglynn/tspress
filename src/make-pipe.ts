import Pipeable from "./types/pipeable";
import Pipe from "./types/pipe";

const makePipe = <TStart, TEnd, TContext>(): Pipe<TStart, TEnd, TContext> => (
  ...pipeables: Array<Pipeable<any, any>>
) => (start: TStart, context: TContext) =>
  pipeables.reduce<any>(async (previous, pipe) => {
    const piped = pipe(await previous, context);
    return (piped instanceof Promise && piped) || Promise.resolve(piped);
  }, start);
export default makePipe;
