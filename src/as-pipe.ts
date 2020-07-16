import Page from "./types/page";
import Pipeable from "./types/pipeable";
import Pipe from "./types/pipe";

const asPipe = (pages: Page[], ...params: any[]): Pipe<Page[]> => {
  return (
    ...pipeables: Array<Pipeable<any, any>>
  ): (() => Promise<any>) => () =>
    pipeables.reduce<any>(async (previous, pipe) => {
      const piped = pipe(await previous, ...params);
      return (piped instanceof Promise && piped) || Promise.resolve(piped);
    }, pages);
};
export default asPipe;
