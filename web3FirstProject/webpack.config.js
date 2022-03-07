const path = require('path');

module.exports = {
    mode:'development',
    
    
    entry: './src/index.js',  
    output: {
        filename: 'main.js',
        path: path.join(__dirname, './dist'),
    
    },
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
   },

    devServer: {
        static: {
          directory: path.join(__dirname, './dist'),
        },
        compress: true,
        port: 8080,
      },

    
}