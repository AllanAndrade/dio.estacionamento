/**
* SCSS
*/

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    test: /\.(scss)$/,
    use: [
         {
             // Adds CSS to the DOM by injecting a `<style>` tag
             loader: 'style-loader'
         },
        //MiniCssExtractPlugin.loader, // ADD CSS to CSS file
        {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader',
            options: {
                sourceMap: false,
            },
        },
        {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
             
        },
        {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader',
            options: {
                sourceMap: false,
            },
        }
    ]
}