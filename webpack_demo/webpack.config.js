const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
        // entry: './src/index.js',
        entry: {
            app: './src/index.js',
        },
        devtool: 'inline-source-map',//解释说明错误指向
        devServer: {  //设置一个简单的web服务器，实时重新加载，在 localhost:8080 下建立服务
            contentBase: './dist',
            hot: true  //热替换
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),  //编译的时候清除旧文件
            new HtmlWebpackPlugin({  //自动生成html
                title: 'Output Management'
            }),
            new webpack.NameModulesPlugin(),  //热替换
            new webpack.HotModuleReplacementPlugin(),  //以便更容易查看要修补(patch)的依赖

        ],
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        // webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 loader。
        module: {
            rules: [
            // 在这种情况下，以 .css 结尾的全部文件，都将被提供给 style-loader 和 css-loader。
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // 现在，当你 import MyImage from './my-image.png'，该图像将被处理并添加到 output 目录，_并且_ MyImage 变量将包含该图像在处理后的最终 url。当使用 css-loader 时，如上所示，你的 CSS 中的 url('./my-image.png') 会使用类似的过程去处理。loader 会识别这是一个本地文件，并将 './my-image.png' 路径，替换为输出目录中图像的最终路径。html-loader 以相同的方式处理 <img src="./my-image.png" />。
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            // file-loader也可以用来处理字体
            {
              test: /\.(woff|woff2|eot|ttf|otf)$/,
              use: [
                'file-loader'
              ]
            }
            ]
        }
    }
