/**
 * gif
 */

// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    test: /\.(jpe?g|png|gif|svg)$/i,
    use: [
        {
            loader: 'url-loader',
            options: {
                // name: '/public/icons/[name].[ext]',
                outputPath: 'images',
                encoding: 'utf8'
            }
        }
    ],
    
};
