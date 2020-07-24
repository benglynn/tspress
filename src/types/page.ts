import Directory from "./directory";

/**
 * Representation of a page of the site.
 *
 * Page is derived from a directory, is the input and output type of each
 * pipeable in the page pipe, is the type passed to each reducer, and is the
 * input and output type of each pipeable in the compile pipe.
 */
interface Page extends Directory {
  readonly mdMeta: { [key: string]: any };
  readonly mdHtml: string;
}

export default Page;
