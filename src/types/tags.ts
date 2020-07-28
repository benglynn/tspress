import Page from "./page";

interface Tags {
  readonly [key: string]: ReadonlyArray<Page>;
}

export default Tags;
