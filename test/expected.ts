export const expectedDirs = [
  {
    name: "",
    path: "/",
    md:
      "---\ntemplate: 'home.pug'\ntags:\n - global\n---\n\n# Beverage vessels\n\nWelcome!",
  },
  {
    name: "french-press",
    path: "/french-press/",
    md:
      "---\nheadline: French press\ntags:\n - vessel\n---\n\n# French press\n\nThe French press is also known as a cafetière.",
  },
  {
    name: "tea-pot",
    path: "/tea-pot/",
    md:
      "---\nheadline: Tea pot\ntags:\n - vessel\n---\n\n# Tea pot\n\nA teapot is a vessel used for steeping tea leaves.",
  },
];

export const expectedPages = [
  {
    name: "",
    path: "/",
    md:
      "---\ntemplate: 'home.pug'\ntags:\n - global\n---\n\n# Beverage vessels\n\nWelcome!",
    mdHtml: "<h1>Beverage vessels</h1>\n<p>Welcome!</p>",
    mdMeta: { template: "home.pug", tags: ["global"] },
  },
  {
    name: "french-press",
    path: "/french-press/",
    md:
      "---\nheadline: French press\ntags:\n - vessel\n---\n\n# French press\n\nThe French press is also known as a cafetière.",
    mdHtml:
      "<h1>French press</h1>\n<p>The French press is also known as a cafetière.</p>",
    mdMeta: { headline: "French press", tags: ["vessel"] },
  },
  {
    name: "tea-pot",
    path: "/tea-pot/",
    md:
      "---\nheadline: Tea pot\ntags:\n - vessel\n---\n\n# Tea pot\n\nA teapot is a vessel used for steeping tea leaves.",
    mdHtml:
      "<h1>Tea pot</h1>\n<p>A teapot is a vessel used for steeping tea leaves.</p>",
    mdMeta: { headline: "Tea pot", tags: ["vessel"] },
  },
];

export const expectedContext = {
  tags: {
    global: [
      {
        name: "",
        path: "/",
        md:
          "---\ntemplate: 'home.pug'\ntags:\n - global\n---\n\n# Beverage vessels\n\nWelcome!",
        mdHtml: "<h1>Beverage vessels</h1>\n<p>Welcome!</p>",
        mdMeta: { template: "home.pug", tags: ["global"] },
      },
    ],
    vessel: [
      {
        name: "french-press",
        path: "/french-press/",
        md:
          "---\nheadline: French press\ntags:\n - vessel\n---\n\n# French press\n\nThe French press is also known as a cafetière.",
        mdHtml:
          "<h1>French press</h1>\n<p>The French press is also known as a cafetière.</p>",
        mdMeta: { headline: "French press", tags: ["vessel"] },
      },
      {
        name: "tea-pot",
        path: "/tea-pot/",
        md:
          "---\nheadline: Tea pot\ntags:\n - vessel\n---\n\n# Tea pot\n\nA teapot is a vessel used for steeping tea leaves.",
        mdHtml:
          "<h1>Tea pot</h1>\n<p>A teapot is a vessel used for steeping tea leaves.</p>",
        mdMeta: { headline: "Tea pot", tags: ["vessel"] },
      },
    ],
  },
};
