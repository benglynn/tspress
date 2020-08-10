import PagesMap from "../types/pages-map";
import Page from "../types/page";

export const pagesMapReducer = (page: Page, previous: PagesMap): PagesMap => ({
  ...previous,
  [page.path]: page,
});

export const pagesMapSeed = <PagesMap>{};
