var webpack = require('webpack');
var path = require('path');

const HtmlWebpackPlugin = require("html-webpack-plugin"); 

const cleanWebpackPlugin = require("clean-webpack-plugin");

var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var UglifyJsPlugin=require('uglifyjs-webpack-plugin');

module.exports = {
    mode: "development", 
    devtool: 'cheap-module-eval-source-map',
    entry:      
    {
        'index':['./client/index.js']
    },
    output: {
        path: path.resolve(__dirname, 'build/'),  
        filename: '[name].js', 
        publicPath: '', 
        chunkFilename: "[chunkhash].js"   
    },
    module: {
        rules:[
             {
                test: /\.js|\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react','es2015','env'],
                        plugins: [require('babel-plugin-transform-object-rest-spread')]  
                    }
                }
             },
             {
                test: /\.css$/,
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                loader: 'style-loader!css-loader?modules&importLoaders&localIdentName=[name]__[local]__[hash:base64:5]!sass-loader?sourceMap=true&sourceMapContents=true',
 
             },
               
             {
                test: /\.json?$/,
                loader: 'json'
             },
          
             {
                test: /\.html$/,
                use: [
                    "htmllint-loader",
                    {
                        loader: "html-loader",
                        options: {
                        }
                    }
                ]
            },
            {
                test:  /\.scss$/, 
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                use: [
                    {  
                        loader: 'style-loader'  
                    },
                    {
                        loader: 'css-loader',  
                    },
                    {
                        loader: 'sass-loader', 
                        options: { 
                            sourceMap:true  ,
                            sourceMapContents:true
                        }
                    },
                    
                ]
            }
        ]  //end rules    
    },
     resolve: {
        alias: {
            'react': path.join(__dirname,'node_modules','react'),
        },
        extensions: [".js", ".json", ".jsx", ".css", ".scss"],
    },
     performance: {
        hints:  false, // enum
        maxAssetSize: 200000, // int (in bytes),
        maxEntrypointSize: 400000, // int (in bytes)
    },

    plugins: [
        // 调用之前先清除
	//   new cleanWebpackPlugin(["build"]),


       new HtmlWebpackPlugin({
           template:'./views/index.html',
           filename:'index.html',
           title:'测试',
           chunks:['index'],
           inject: 'body',
       }),
       new webpack.HotModuleReplacementPlugin(),
       new OpenBrowserPlugin({ url: 'http://localhost:3000' }),
       new webpack.DefinePlugin({    
        'process.env.NODE_ENV': '"production"'
       })
    ],
   
     optimization: {   
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: false
                }
            })
        ],
    },

     devServer: {
        host:'localhost',
        port:3001,
        contentBase: path.resolve(__dirname, ''), 
        historyApiFallback: true,
        hot: true, 
        https: false, 
        noInfo: true, 
    }
};
