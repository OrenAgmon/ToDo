const path = require('path')
const { mainModule } = require('process')

module.exports = {
    entry: './src/index.js',
    mode:'development',
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, 'dist')
    }
}