import { file, directories } from "./util";
import { join } from "path";
import Page from "./page";
import PageReducer from "./page-reducer";

async function press<TContext>(
  directory: string,
  seed: TContext,
  reducers: { [K in keyof TContext]: PageReducer<TContext[K]> },
  name = "",
  path = "/",
  pages: Page[] = []
): Promise<[Page[], TContext]> {
  const md = file(join(directory, "index.md"));
  const page = { name, path, md };
  const nextPages = pages.concat(page);
  const nextContext = <TContext>(
    Object.fromEntries(
      await Promise.all(
        Object.entries<PageReducer<any>>(reducers).map(
          async ([key, pageReducer]) =>
            <[string, any]>[key, await pageReducer(page, (<any>seed)[key])]
        )
      )
    )
  );
  return directories(directory).reduce(async (previous, dir) => {
    const [pages, context] = await previous;
    return press(
      join(directory, dir.name),
      context,
      reducers,
      dir.name,
      `${path}${dir.name}/`,
      pages
    );
  }, Promise.resolve(<[Page[], TContext]>[nextPages, nextContext]));
}

export default press;
