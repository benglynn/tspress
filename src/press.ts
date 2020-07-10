import directories from "./directories";
import { join } from "path";
import Page from "./page";
import PageReducer from "./page-reducer";
import Pressed from "./pressed";

function press<T>(
  directory: string,
  seed: T,
  reducers: { [K in keyof T]: PageReducer<T[K]> },
  name = "",
  path = "/",
  pages: Page[] = []
): Pressed<T> {
  const mdMeta = { fake: "for now" };
  const page = { name, path, md: "# Fake for now", mdMeta };
  const nextPages = pages.concat(page);
  const reduced = <T>(
    Object.fromEntries(
      Object.entries<PageReducer<any>>(reducers).map(([key, pageReducer]) => [
        key,
        pageReducer(page, (<any>seed)[key]),
      ])
    )
  );
  return directories(directory).reduce(
    (pressed, dir) =>
      press(
        join(directory, dir.name),
        pressed.reduced,
        reducers,
        dir.name,
        `${path}${dir.name}/`,
        pressed.pages
      ),
    <Pressed<T>>{ pages: nextPages, reduced }
  );
}

export default press;
