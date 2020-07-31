import pipe from "./pipe";
import Directory from "./types/directory";
import Pipeable from "./types/pipeable";
import PressContext from "./types/press-context";

const pagePipe = <TPage>(
  toPage: (dir: Directory, ctx: PressContext) => TPage | Promise<TPage>,
  ...pipeables: ReadonlyArray<Pipeable<TPage, PressContext>>
) => async (dir: Directory, ctx: PressContext): Promise<TPage> =>
  pipe(...pipeables)(await toPage(dir, ctx), ctx);

export default pagePipe;
