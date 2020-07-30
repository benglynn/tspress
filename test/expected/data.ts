import { join } from "path";

const content = join(__dirname, "../fixture/content");
const templates = join(__dirname, "../fixture/templates");
const homeTemplate = join(templates, "home.pug");
const pageTemplate = join(templates, "page.pug");
const layoutTemplate = join(templates, "layout.pug");

const indexDir = {
  name: "",
  path: "/",
  md:
    "---\nheadline: Home\ntemplate: home.pug\ntags:\n - global\n---\n\n# Beverage vessels\n\nWelcome!",
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
    homeTemplate,
    join(templates, "layout.pug"),
  ],
  mdHtml: "",
  mdMeta: { headline: "Home", template: "home.pug", tags: ["global"] },
  template: homeTemplate,
  html: "",
};

const frenchPressPage = {
  ...frenchPressDir,
  dependencies: [...frenchPressDir.dependencies, pageTemplate, layoutTemplate],
  mdHtml: "",
  mdMeta: { headline: "French press", tags: ["vessel"] },
  template: pageTemplate,
  html: "",
};

const teaPotPage = {
  ...teaPotDir,
  dependencies: [...teaPotDir.dependencies, pageTemplate, layoutTemplate],
  mdHtml: "",
  mdMeta: { headline: "Tea pot", tags: ["vessel"] },
  template: pageTemplate,
  html: "",
};

export const expectedDirs = [indexDir, frenchPressDir, teaPotDir];

export const expectedPages = [indexPage, frenchPressPage, teaPotPage];

export const expectedContext = {
  tags: {
    global: [indexPage],
    vessel: [frenchPressPage, teaPotPage],
  },
};
