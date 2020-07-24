import { file, directories } from "./util";
import { join } from "path";
import Directory from "./types/directory";
import Reducer from "./types/reducer";
import PressContext from "./types/press-context";

const press = async <TPage, TContext>(
  content: string,
  templates: string,
  totoPage: (d: Directory, c: PressContext) => TPage | Promise<TPage>,
  seed: TContext,
  reducers: { [K in keyof TContext]: Reducer<TPage, TContext[K]> },
  pages: TPage[] = [],
  name = "",
  path = "/"
): Promise<[TPage[], TContext]> => {
  const mdPath = join(content, path, "index.md");
  const dir: Directory = {
    name,
    path,
    md: file(mdPath),
    dependencies: [mdPath],
  };
  const page = await totoPage(dir, { content, templates });
  const nextPages = pages.concat(page);
  const nextContext = <TContext>(
    Object.fromEntries(
      await Promise.all(
        Object.entries<Reducer<TPage, any>>(reducers).map(
          async ([key, reducer]) =>
            <[string, any]>[key, await reducer(page, (<any>seed)[key])]
        )
      )
    )
  );
  return directories(join(content, path)).reduce(async (previous, dir) => {
    const [pages, context] = await previous;
    return press(
      content,
      templates,
      totoPage,
      context,
      reducers,
      pages,
      dir.name,
      `${path}${dir.name}/`
    );
  }, Promise.resolve(<[TPage[], TContext]>[nextPages, nextContext]));
};

export default press;
