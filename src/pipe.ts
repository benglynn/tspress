import Pipeable from "./types/pipeable";

const pipe = <TInOut, TContext>(
  ...pipeables: ReadonlyArray<Pipeable<TInOut, TContext>>
) => (start: TInOut, context: TContext): Promise<TInOut> => {
  return pipeables.reduce<Promise<TInOut>>(async (previous, pipeable) => {
    const piped = pipeable(await previous, context);
    return (piped instanceof Promise && piped) || Promise.resolve(piped);
  }, Promise.resolve(start));
};

export default pipe;
