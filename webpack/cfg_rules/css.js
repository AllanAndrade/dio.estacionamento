/**
 * CSS
 */

// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    test: /\.(css)$/,
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
                sourceMap: true,
                url: true,
                import: true
            }
        },
        /*
        {
            loader: 'css-url-loader',
            options: {
                from: '/assets/',
                to: 'https://domain/assets/'
            }
        }
        */
    ]
};
