/**
 * Represents a directory on disk, where `md` is the raw markdown discovered in
 * the directory's `index.md`.
 */
interface Directory {
  readonly name: string;
  readonly path: string;
  readonly md: string;
  dependencies: ReadonlyArray<string>;
}

export default Directory;
