import Page from "./types/page";
import Pipeable from "./types/pipeable";
import ContextPipeable from "./types/context-pipeable";
import Pipe from "./types/pipe";

const asPipe = <TContext>(pages: Page[], context: TContext): Pipe<Page[]> => {
  return (
    ...pipeables: Array<
      Pipeable<any, any> & ContextPipeable<TContext, any, any>
    >
  ): Promise<any> =>
    pipeables.reduce<any>(async (previous, pipe) => {
      const piped = pipe(await previous, context);
      return (piped instanceof Promise && piped) || Promise.resolve(piped);
    }, pages);
};
export default asPipe;
