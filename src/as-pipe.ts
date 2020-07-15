import Page from "./types/page";
import Pipeable from "./types/pipeable";
import Pipe from "./types/pipe";

const asPipe = <TContext>(pages: Page[], context: TContext): Pipe<TContext> => {
  return (...pipeables: Array<Pipeable<TContext, any, any>>): Promise<any> =>
    pipeables.reduce<any>(async (previous, pipe) => {
      const piped = pipe(await previous, context);
      return (piped instanceof Promise && piped) || Promise.resolve(piped);
    }, pages);
};
export default asPipe;
