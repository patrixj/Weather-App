var path = require('path');

module.exports = {
    mode: "none",
    entry: {},
    devServer: {
        contentBase: path.join(__dirname, ''),
        port: 8080,
    }
};