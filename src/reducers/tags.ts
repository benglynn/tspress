import Page from "../types/page";
import Tags from "../types/tags";

export const tagsReducer = (page: Page, previous: Tags): Tags =>
  ((Array.isArray(page.mdMeta.tags) && page.mdMeta.tags) || [])
    .filter((page): page is string => typeof page === "string")
    .reduce(
      (tags, tag) => ({
        ...tags,
        [tag]: [...(previous[tag] || []), page],
      }),
      previous
    );

export const tagsSeed = <Tags>{};
