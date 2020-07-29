import WebpackAsset from "./webpack-asset";

interface WebpackCompilation {
  assets: { [key: string]: WebpackAsset };
  fileDependencies: Set<string>;
  fileTimestamps: Map<string, number>;
}

export default WebpackCompilation;
