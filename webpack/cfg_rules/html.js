const path = require('path');


module.exports = { // HTML
    // HTML LOADER
    // Super important: We need to test for the html
    // as well as the nunjucks files
    test: /\.html$/,
    use: [
        {
            loader: 'html-loader',
            options: {
                sources: true,
            },
        },
      
        {
            // Geko Html Loader
            loader: 'geko-html-loader',
        }
    ]
}