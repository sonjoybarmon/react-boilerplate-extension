const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    popup: path.resolve("src/popup/popup.tsx"),
  },
  mode: "development",
  devtool: "cheap-module-source-map",
  //   devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: { noEmit: false },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        exclude: /node_modules/,
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss",
                    {
                      plugins: [
                        require("tailwindcss"),
                        require("autoprefixer"),
                      ],
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("src/static/manifest.json"),
          to: path.resolve("dist"),
        },
        { from: path.resolve("src/static"), to: path.resolve("dist") },
      ],
    }),
    new HTMLPlugin({
      title: "React extension",
      filename: `popup.html`,
      chunks: ["popup"],
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    // path: path.join(__dirname, "dist/js"),
    filename: "[name].js",
  },
};
