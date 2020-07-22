import Directory from "./types/directory";
import dirToItem from "./pipeables/dir-to-item";
import Pipeable from "./types/pipeable2";

const pipe = <TInOut, TContext>(
  ...pipeables: ReadonlyArray<Pipeable<TInOut, TContext>>
) => (start: TInOut, context: TContext): TInOut => {
  return pipeables.reduce<any>(async (previous, pipeable) => {
    const piped = pipeable(await previous, context);
    return (piped instanceof Promise && piped) || Promise.resolve(piped);
  }, start);
};

export default pipe;

// const p1 = (i: string, c: { message: string }) => i + "asdf";
// const p2 = (i: string, c: { message: string }) => i + c.message;
// const p3 = (i: string, c: { message: string }) => i;

// const p11 = (i: string, c: null) => i + "asdf";
// const p12 = (i: string) => i;
// const p13 = (i: string) => i;

// const compile = pipe(p1, p2, p3, p2)("hello ", { message: "Ben" });
// const compile2 = pipe(p11, p12, p13, p12)("hello ", null);

// const toPipeInput = (dir: Directory): string => dir.name;
// const dirPipe = directoryPipe(toPipeInput);

// const what = directoryPipe(dirToItem);
