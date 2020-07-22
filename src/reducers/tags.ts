import Item from "../types/item";

type Tags = { [key: string]: ReadonlyArray<Item> };

export const seed = <Tags>{};

/**
 * Reduce an object of tags discovered in a Item's metadata, where tags become
 * keys who's values are an array of Items.
 */
export const reducer = (item: Item, previous: Tags) =>
  ((Array.isArray(item.mdMeta.tags) && item.mdMeta.tags) || [])
    .filter((item): item is string => typeof item === "string")
    .reduce(
      (tags, tag) => ({
        ...tags,
        [tag]: [...(previous[tag] || []), item],
      }),
      previous
    );
