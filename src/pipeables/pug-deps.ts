import { join } from "path";
import Page from "../types/page";
import PressContext from "../types/press-context";

/**
 * Add pug template dependencies.
 */
const pugDeps = (page: Page, ctx: PressContext): Page => ({
  ...page,
  dependencies: [
    ...page.dependencies,
    join(ctx.templates, `${page.mdMeta.template || "page"}.pug`),
  ],
});

export default pugDeps;
