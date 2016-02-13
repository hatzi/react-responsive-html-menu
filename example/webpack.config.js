module.exports = {
    entry: "./app/index.js",
    output: {
        path: __dirname,
        filename: "dist/bundle.js"
    },
    plugins: [],
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.js$|\.jsx$/, loaders: ['babel'] },
        ]
    }
};
