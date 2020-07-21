import Pipeable from "./types/pipeable";
import Pipe from "./types/pipe";

const makePipe = <TStart, TContext>(): Pipe<TStart, TContext> => (
  ...pipeables: Array<Pipeable<any, any, TContext>>
) => (start: TStart, context: TContext) =>
  pipeables.reduce<any>(async (previous, pipe) => {
    const piped = pipe(await previous, context);
    return (piped instanceof Promise && piped) || Promise.resolve(piped);
  }, start);
export default makePipe;
