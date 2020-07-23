import Directory from "./directory";

/**
 * Extra properties added to a directory in a pipeline before it is reduced.
 * Each pipeable expects a Page type.
 */
interface Page extends Directory {
  readonly mdMeta: { [key: string]: any };
  readonly mdHtml: string;
}

export default Page;
