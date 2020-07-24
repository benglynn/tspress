import { join } from "path";

const fixture = join(__dirname, "fixture");

const indexDir = {
  name: "",
  path: "/",
  md:
    "---\ntemplate: 'home.pug'\ntags:\n - global\n---\n\n# Beverage vessels\n\nWelcome!",
  dependencies: [join(fixture, "/content/index.md")],
};

const indexPage = {
  ...indexDir,
  mdHtml: "<h1>Beverage vessels</h1>\n<p>Welcome!</p>",
  mdMeta: { template: "home.pug", tags: ["global"] },
};

const frenchPressDir = {
  name: "french-press",
  path: "/french-press/",
  md:
    "---\nheadline: French press\ntags:\n - vessel\n---\n\n# French press\n\nThe French press is also known as a cafetière.",
  dependencies: [join(fixture, "/content/french-press/index.md")],
};

const frenchPressPage = {
  ...frenchPressDir,
  mdHtml:
    "<h1>French press</h1>\n<p>The French press is also known as a cafetière.</p>",
  mdMeta: { headline: "French press", tags: ["vessel"] },
};

const teaPotDir = {
  name: "tea-pot",
  path: "/tea-pot/",
  md:
    "---\nheadline: Tea pot\ntags:\n - vessel\n---\n\n# Tea pot\n\nA teapot is a vessel used for steeping tea leaves.",
  dependencies: [join(fixture, "/content/tea-pot/index.md")],
};

const teaPotPage = {
  ...teaPotDir,
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
