/**
 * Represents a directory on disk, where `md` is the raw markdown discovered in
 * the directory's `index.md`.
 */
interface Directory {
  name: string;
  path: string;
  md: string;
}

export default Directory;
