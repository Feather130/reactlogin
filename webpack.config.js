const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSCSS = new ExtractTextPlugin({
	filename: (getPath) => {
		return getPath('css/[name]-scss.css').replace('css/js', 'css');
	}
});
const extractCSS = new ExtractTextPlugin({
	filename: (getPath) => {
		return getPath('css/[name].css').replace('css/js', 'css');
	}
});

module.exports = {
	entry: './src/js/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'My App',
			template: './src/index.html',
			favicon: './src/imgs/favicon.ico'
		}),
		extractCSS,
		extractSCSS
	],
	devServer: {
		contentBase: './dist/'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loaders: ['babel-loader']
		}, {
			test: /\.css$/,
			use: extractCSS.extract({
				fallback: 'style-loader',
				use: ['css-loader']
			})
		}, {
			test: /\.scss$/,
			use: extractSCSS.extract({
				fallback: 'style-loader',
				use: ['css-loader?modules', 'sass-loader']
			})
		}, {
			test: /\.(png|svg|jpg|gif)$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'images/'
				}
			}]
		}, {
			test: /\.(woff|woff2|eot|ttf|otf)$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					publicPath: '../',
					outputPath: 'font/'
				}
			}]
		}]
	}
}