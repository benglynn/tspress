import { join } from "path";

const content = join(__dirname, "fixture/content");
const templates = join(__dirname, "fixture/templates");

const indexDir = {
  name: "",
  path: "/",
  md:
    "---\ntemplate: 'home'\ntags:\n - global\n---\n\n# Beverage vessels\n\nWelcome!",
  dependencies: [join(content, "index.md")],
};

const frenchPressDir = {
  name: "french-press",
  path: "/french-press/",
  md:
    "---\nheadline: French press\ntags:\n - vessel\n---\n\n# French press\n\nThe French press is also known as a cafetière.",
  dependencies: [join(content, "french-press/index.md")],
};

const teaPotDir = {
  name: "tea-pot",
  path: "/tea-pot/",
  md:
    "---\nheadline: Tea pot\ntags:\n - vessel\n---\n\n# Tea pot\n\nA teapot is a vessel used for steeping tea leaves.",
  dependencies: [join(content, "tea-pot/index.md")],
};

const indexPage = {
  ...indexDir,
  dependencies: [
    ...indexDir.dependencies,
    join(templates, "home.pug"),
    join(templates, "layout.pug"),
  ],
  mdHtml: "<h1>Beverage vessels</h1>\n<p>Welcome!</p>",
  mdMeta: { template: "home", tags: ["global"] },
};

const frenchPressPage = {
  ...frenchPressDir,
  dependencies: [
    ...frenchPressDir.dependencies,
    join(templates, "page.pug"),
    join(templates, "layout.pug"),
  ],
  mdHtml:
    "<h1>French press</h1>\n<p>The French press is also known as a cafetière.</p>",
  mdMeta: { headline: "French press", tags: ["vessel"] },
};

const teaPotPage = {
  ...teaPotDir,
  dependencies: [
    ...teaPotDir.dependencies,
    join(templates, "page.pug"),
    join(templates, "layout.pug"),
  ],
  mdHtml:
    "<h1>Tea pot</h1>\n<p>A teapot is a vessel used for steeping tea leaves.</p>",
  mdMeta: { headline: "Tea pot", tags: ["vessel"] },
};

export const expectedDirs = [indexDir, frenchPressDir, teaPotDir];

export const expectedPages = [indexPage, frenchPressPage, teaPotPage];

export const expectedContext = {
  tags: {
    global: [indexPage],
    vessel: [frenchPressPage, teaPotPage],
  },
};
