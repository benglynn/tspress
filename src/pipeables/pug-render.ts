import Page from "../types/page";
import CompileContext from "../types/compile-context";
import Pipeable from "../types/pipeable";

type PugRender = Pipeable<ReadonlyArray<Page>, CompileContext>;

const pugRender: PugRender = (pages, context) => {
  return pages.map((page) => ({ ...page, html: "<html>pugRender</html>" }));
};

export default pugRender;
