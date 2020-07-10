import Pressed from "../../src/pressed";

const pressedWithReducers: Pressed<{}> = {
  reduced: {
    names: ["", "french-press", "tea-pot"],
    pageCount: 3,
  },
  pages: [
    {
      name: "",
      path: "/",
      md: "# Fake for now",
      mdMeta: { fake: "for now" },
    },
    {
      name: "french-press",
      path: "/french-press/",
      md: "# Fake for now",
      mdMeta: { fake: "for now" },
    },
    {
      name: "tea-pot",
      path: "/tea-pot/",
      md: "# Fake for now",
      mdMeta: { fake: "for now" },
    },
  ],
};

export default pressedWithReducers;
