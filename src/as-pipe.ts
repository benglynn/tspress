import Page from "./page";
import Pipeable from "./pipeable";
import Pipe from "./pipe";

const asPipe = <TContext>(pages: Page[], context: TContext): Pipe<TContext> => {
  return (...pipeables: Array<Pipeable<TContext, any, any>>): Promise<any> =>
    pipeables.reduce<any>(async (previous, pipe) => {
      const piped = pipe(await previous, context);
      return (piped instanceof Promise && piped) || Promise.resolve(piped);
    }, pages);
};
export default asPipe;
