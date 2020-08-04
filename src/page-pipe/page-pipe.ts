import pipe from "../pipe";
import Directory from "../types/directory";
import Pipeable from "../types/pipeable";
import PressContext from "../types/press-context";
import Page from "../types/page";

const pagePipe = (
  pageFromDir: (dir: Directory, context: PressContext) => Page | Promise<Page>,
  ...pipeables: ReadonlyArray<Pipeable<Page, PressContext>>
) => async (dir: Directory, context: PressContext): Promise<Page> =>
  pipe(...pipeables)(await pageFromDir(dir, context), context);

export default pagePipe;
