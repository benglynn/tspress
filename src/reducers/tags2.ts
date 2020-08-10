import Page from "../types/page";
import Tags2 from "../types/tags2";

export const tags2Reducer = (page: Page, previous: Tags2): Tags2 =>
  ((Array.isArray(page.mdMeta.tags) && page.mdMeta.tags) || [])
    .filter((page): page is string => typeof page === "string")
    .reduce(
      (tags, tag) => ({
        ...tags,
        [tag]: [...(previous[tag] || []), page.path],
      }),
      previous
    );

export const tags2Seed = <Tags2>{};
