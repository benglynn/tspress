import pipe from "./pipe";
import Directory from "./types/directory";
import Pipeable from "./types/pipeable";

const pagePipe = <TPage>(
  toPage: (dir: Directory) => TPage | Promise<TPage>,
  ...pipeables: ReadonlyArray<Pipeable<TPage, null>>
) => async (dir: Directory) => pipe(...pipeables)(await toPage(dir), null);

export default pagePipe;
