const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

const path = require('path');

module.exports = { // Typescript
    test: /\.glob\.js$/,
    type: 'asset/source',
    include: [
        path.resolve(__dirname, "../src")
    ],
    exclude: [
        /node_modules/
    ],
}