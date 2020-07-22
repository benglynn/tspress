import pipe from "./pipe2";
import Directory from "./types/directory";
import Pipeable from "./types/pipeable2";

const directoryPipe = <TInOut>(
  toPipeInput: (dir: Directory) => TInOut,
  ...pipeables: ReadonlyArray<Pipeable<TInOut, null>>
) => (dir: Directory) => pipe(...pipeables)(toPipeInput(dir), null);

export default directoryPipe;
