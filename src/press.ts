import { file, directories } from "./util";
import { join } from "path";
import Directory from "./types/directory";
import Pipeable from "./types/pipeable";
import ItemReducer from "./types/item-reducer";

async function press<TItem, TContext>(
  directory: string,
  toItem: Pipeable<Directory, TItem, null>,
  seed: TContext,
  reducers: { [K in keyof TContext]: ItemReducer<TItem, TContext[K]> },
  items: TItem[] = [],
  name = "",
  path = "/"
): Promise<[TItem[], TContext]> {
  const md = file(join(directory, "index.md"));
  const dir: Directory = { name, path, md };
  const item = await toItem(dir, null);
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
      toItem,
      context,
      reducers,
      items,
      dir.name,
      `${path}${dir.name}/`
    );
  }, Promise.resolve(<[TItem[], TContext]>[nextItems, nextContext]));
}

export default press;
