import pipe from "./pipe";
import Directory from "./types/directory";
import Pipeable from "./types/pipeable";

const directoryPipe = <TInOut>(
  toPipeInput: (dir: Directory) => TInOut | Promise<TInOut>,
  ...pipeables: ReadonlyArray<Pipeable<TInOut, null>>
) => async (dir: Directory) => pipe(...pipeables)(await toPipeInput(dir), null);

export default directoryPipe;
