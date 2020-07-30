import Pipeable from "./types/pipeable";

const pipe = <TInOut, TContext>(
  ...pipeables: ReadonlyArray<Pipeable<TInOut, TContext>>
) => (start: TInOut, context: TContext): Promise<TInOut> => {
  return pipeables.reduce<any>(async (previous, pipeable) => {
    const piped = pipeable(await previous, context);
    return (piped instanceof Promise && piped) || Promise.resolve(piped);
  }, start);
};

export default pipe;
