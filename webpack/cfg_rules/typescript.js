const isDev = process.env.NODE_ENV === 'development'
const isProd  = process.env.NODE_ENV === 'production'


module.exports = { // Typescript
    test: /\.tsx?$/,
    use: ['ts-loader'],
    exclude: /node_modules/,
    
    
}