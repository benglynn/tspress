import { file, directories } from "./util";
import { join } from "path";
import Page from "./page";
import PageReducer from "./page-reducer";

function press<TContext>(
  directory: string,
  seed: TContext,
  reducers: { [K in keyof TContext]: PageReducer<TContext[K]> },
  name = "",
  path = "/",
  pages: Page[] = []
): [Page[], TContext] {
  const md = file(join(directory, "index.md"));
  const page = { name, path, md };
  const nextPages = pages.concat(page);
  const context = <TContext>(
    Object.fromEntries(
      Object.entries<PageReducer<any>>(reducers).map(([key, pageReducer]) => [
        key,
        pageReducer(page, (<any>seed)[key]),
      ])
    )
  );
  return directories(directory).reduce(
    ([pages, context], dir) =>
      press(
        join(directory, dir.name),
        context,
        reducers,
        dir.name,
        `${path}${dir.name}/`,
        pages
      ),
    [nextPages, context]
  );
}

export default press;
