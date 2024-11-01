const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const deps = require("./package.json").dependencies;

const printCompilationMessage = require("./compilation.config.js");

module.exports = (_, argv) => ({
  output: {
    publicPath: "http://localhost:4003/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 4003,
    historyApiFallback: true,
    watchFiles: [path.resolve(__dirname, "src")],
    onListening: function (devServer) {
      const port = devServer.server.address().port;

      printCompilationMessage("compiling", port);

      devServer.compiler.hooks.done.tap("OutputMessagePlugin", (stats) => {
        setImmediate(() => {
          if (stats.hasErrors()) {
            printCompilationMessage("failure", port);
          } else {
            printCompilationMessage("success", port);
          }
        });
      });
    },
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "mf_login",
      filename: "remoteEntry.js",
      remotes: {
        EFO_core_app: "EFO_core_app@http://localhost:4000/remoteEntry.js",
      },
      exposes: {
        "./auth": "./src/pages/Auth.tsx",
        "./store": "./src/lib/hooks/auth_hook.tsx",
        "./userAtom": "./src/store/auth_store.ts",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
        jotai: {
          singleton: true,
          requiredVersion: deps.jotai,
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new Dotenv(),
    new TsconfigPathsPlugin({
      extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    }),
  ],
});
