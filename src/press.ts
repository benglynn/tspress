import { file, directories } from "./util";
import { join } from "path";
import Page from "./types/page";
import ItemReducer from "./types/item-reducer";
import Pipe from "./types/pipe";

async function press<TItem, TContext>(
  directory: string,
  items: TItem[] = [],
  toItem: (p: Page) => TItem,
  seed: TContext,
  reducers: { [K in keyof TContext]: ItemReducer<TItem, TContext[K]> },
  name = "",
  path = "/"
): Promise<[TItem[], TContext]> {
  const md = file(join(directory, "index.md"));
  const page: Page = { name, path, md }; // TODO: `md` as `content` the `Page` as `File`
  // TODO: pipeline....
  const item = (page as unknown) as TItem; // !!!!
  // End
  const nextItems = items.concat(item);
  const nextContext = <TContext>(
    Object.fromEntries(
      await Promise.all(
        Object.entries<ItemReducer<TItem, any>>(reducers).map(
          async ([key, itemReducer]) =>
            <[string, any]>[key, await itemReducer(item, (<any>seed)[key])]
        )
      )
    )
  );
  return directories(directory).reduce(async (previous, dir) => {
    const [items, context] = await previous;
    return press(
      join(directory, dir.name),
      items,
      toItem,
      context,
      reducers,
      dir.name,
      `${path}${dir.name}/`
    );
  }, Promise.resolve(<[TItem[], TContext]>[nextItems, nextContext]));
}

export default press;
