const path = require("path")

var config = {
  watch: true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  mode: "development",
}

var configLibrary = Object.assign({}, config, {
  name: "configLibrary",
  entry: path.resolve(__dirname, "src/nub.core.ts"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "nub.js",
    library: "$",
    libraryTarget: "umd",
  }
});

var configDemo = Object.assign({}, config, {
  name: "configDemo",
  entry: path.resolve(__dirname, "public/js/app.ts"),
  output: {
    path: path.resolve(__dirname, "public/dist"),
    filename: "app.build.js",
  }
});

module.exports = [configLibrary, configDemo];