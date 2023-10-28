const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js", ".json"],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        filename: "bundle.js",
    },
    devServer: {
        contentBase: "./dist",
        compress: false,
        port: 8080,
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
            }),
        ],
    },
};
