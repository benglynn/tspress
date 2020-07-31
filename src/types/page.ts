import Directory from "./directory";

interface Page extends Directory {
  readonly mdMeta: { [key: string]: unknown };
  readonly mdHtml: string;
  readonly html: string;
  readonly template: string;
}

export default Page;
