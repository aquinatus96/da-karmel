const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js",
    groups: "./src/groups/index.js"
  },

  output: {
    filename: "[name].[hash:8].js",
    path: path.resolve(__dirname, "../dist")
  },

  module: {
    rules: [
      {
        test: [/.js$/],
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: [/\.(sc|c|sa)ss/],
        use: [
          MiniCssExtractPlugin.loader,
          // {
          //    loader: 'postcss-loader'
          // },
          {
            loader: "css-loader"
          },
          {
            loader: "resolve-url-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
              // options...
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/images"
            }
          }
        ]
      }
    ]
  },
  // devServer: {
  //   inline: true,
  //   host: "192.168.43.52" /* my own IP */,
  //   port: 2136 /* number not string */,
  //   overlay: {
  //     warnings: true,
  //     errors: true
  //   },
  //   clientLogLevel: "error"
  // },

  //  devServer: {
  //      headers: {
  //          "Access-Control-Allow-Origin": "*",
  //          "Access-Control-Allow-Headers": "*"
  //      }
  //  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "DA Karmel – Duszpasterstwo Akademickie",
      template: "./src/index.html",
      inject: true,
      chunk: ["index"],
      filename: "index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }),
    new HtmlWebpackPlugin({
      title: "DA Karmel – Duszpasterstwo Akademickie",
      template: "./src/groups/index.html",
      inject: true,
      chunk: ["groups"],
      filename: "groups/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }),
    new MiniCssExtractPlugin({
      filename: "style.[hash:8].css"
    }),
    new CopyWebpackPlugin([
      {
        from: "./src/assets/images",
        to: "assets/images"
      }
    ]),
    new CleanWebpackPlugin()
  ]
};
