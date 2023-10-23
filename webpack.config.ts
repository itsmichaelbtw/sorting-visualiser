import "webpack-dev-server";

import type { Configuration } from "webpack";

import path from "path";
import webpack from "webpack";
import crypto from "crypto";

import HtmlWebpackPlugin from "html-webpack-plugin";
import CompressionPlugin from "compression-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import RefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

import PackageJson from "./package.json";

interface RuntimeChunkEntry {
  name: string;
}

const outputFolder = path.resolve(__dirname, ".build");

function createBuildHash(): string {
  const hash = crypto.createHash("md5");
  const update = hash.update(PackageJson.version);
  const digest = update.digest("hex");

  return digest.slice(0, 12);
}

export default function (env: any): Configuration {
  const environment = process.env.NODE_ENV as Configuration["mode"];
  const isDevelopment = environment === "development";
  const isProduction = environment === "production";

  const now = new Date();
  const timestamp = now.getTime();
  const buildHash = createBuildHash();

  return {
    context: __dirname,
    mode: environment,
    devtool: isDevelopment ? "inline-source-map" : false,
    entry: "./index.tsx",
    output: {
      path: outputFolder,
      filename: `js/[name].[fullhash:12].js`,
      chunkFilename: `js/[name].[fullhash:12].vendor.js`,
      globalObject: "this",
      crossOriginLoading: "anonymous"
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    optimization: {
      minimize: isProduction,
      splitChunks: {
        chunks: "async",
        name: "vendors",
        minChunks: 2,
        hidePathInfo: true
      },
      runtimeChunk: {
        name(entry: RuntimeChunkEntry) {
          return `runtime-${entry.name}`;
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.(tsx|ts)?$/,
          loader: require.resolve("babel-loader"),
          exclude: /node_modules/,
          options: {
            presets: [
              [
                require.resolve("@babel/preset-react"),
                { development: isDevelopment, runtime: "automatic" }
              ],
              require.resolve("@babel/preset-env"),
              require.resolve("@babel/preset-typescript")
            ],
            plugins: [
              require.resolve("@babel/plugin-proposal-class-properties"),
              require.resolve("@babel/plugin-proposal-object-rest-spread"),
              isDevelopment && require.resolve("react-refresh/babel")
            ].filter(Boolean)
          }
        },
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            require.resolve("css-loader"),
            require.resolve("postcss-loader")
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        DEVELOPER_TOOLS_ENABLED: JSON.stringify(environment === "development"),
        NODE_ENVIRONMENT: JSON.stringify(environment),
        BUILD_HASH: JSON.stringify(buildHash),
        BUILD_VERSION: JSON.stringify(PackageJson.version),
        BUILD_TIMESTAMP: JSON.stringify(timestamp)
      }),
      new HtmlWebpackPlugin({
        template: "index.html",
        minify: {
          removeComments: isProduction,
          minifyURLs: isProduction,
          minifyJS: isProduction,
          minifyCSS: isProduction
        },
        inject: "head"
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          diagnosticOptions: {
            semantic: true,
            syntactic: true
          },
          mode: "write-references"
        }
      }),
      new MiniCssExtractPlugin({
        filename: `css/[name].[fullhash:12].css`,
        chunkFilename: `css/[name].[fullhash:12].vendor.css`
      }),
      isDevelopment && new RefreshWebpackPlugin(),
      isDevelopment &&
        new CompressionPlugin({
          exclude: /\.map$/
        })
    ].filter(Boolean),
    devServer: {
      hot: isDevelopment
    }
  };
}
