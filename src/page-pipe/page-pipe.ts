import pipe from "../pipe";
import Directory from "../types/directory";
import Pipeable from "../types/pipeable";
import PressContext from "../types/press-context";

const pagePipe = <TPage>(
  toPage: (dir: Directory, context: PressContext) => TPage | Promise<TPage>,
  ...pipeables: ReadonlyArray<Pipeable<TPage, PressContext>>
) => async (dir: Directory, context: PressContext): Promise<TPage> =>
  pipe(...pipeables)(await toPage(dir, context), context);

export default pagePipe;
