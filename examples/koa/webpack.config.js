// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  entry: "./src/client/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
          options: {
            projectReferences: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\/api\/.*/,
        use: {
          loader: "@powrpc/webpack-loader",
          options: { apiUrl: (path) => path },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "cjs", "src", "client"),
  },
};
