import Page from "../types/page";
import Tags from "../types/tags";

/**
 * Fold an object of tags discovered in a page's metadata, where tags become
 * keys with values that are an array of pages.
 */
export const reducer = (page: Page, previous: Tags) =>
  ((Array.isArray(page.mdMeta.tags) && page.mdMeta.tags) || [])
    .filter((page): page is string => typeof page === "string")
    .reduce(
      (tags, tag) => ({
        ...tags,
        [tag]: [...(previous[tag] || []), page],
      }),
      previous
    );

export const seed = <Tags>{};
