const path = require("path");

module.exports = {
    entry: [
        "./src/index.js"
    ],
    devtool: "source-map",
    output: {
        path: path.join(__dirname, "public", "build"),
        publicPath: "/build/",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    cacheDirectory: true
                }
            },
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                ],
            },
            {
                test: /\.(jpg|png)$/,
                loader: "url-loader",
                options: {
                    limit: 45000
                }
            },
            {
                test: /\.md/,
                use: 'raw-loader'
            }
        ]
    }
};
