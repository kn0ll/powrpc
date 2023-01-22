import type { LoaderDefinitionFunction } from "webpack";

const loader: LoaderDefinitionFunction<{
  apiUrl: (path: string) => string;
}> = function () {
  const parts = this.resourcePath.split(this.context)[1]!.split(".");
  return `export default "${this.getOptions().apiUrl(
    parts.slice(0, parts.length - 1).join("/")
  )}";`;
};

module.exports = loader;
module.exports.raw = true;
