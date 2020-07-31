interface Directory {
  readonly name: string;
  readonly path: string;
  readonly md: string;
  dependencies: ReadonlyArray<string>;
}

export default Directory;
