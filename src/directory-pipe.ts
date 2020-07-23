import pipe from "./pipe2";
import Directory from "./types/directory";
import Pipeable from "./types/pipeable2";

const directoryPipe = <TInOut>(
  toPipeInput: (dir: Directory) => TInOut | Promise<TInOut>,
  ...pipeables: ReadonlyArray<Pipeable<TInOut, null>>
) => async (dir: Directory) => pipe(...pipeables)(await toPipeInput(dir), null);

export default directoryPipe;
