const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
	filename: '[name].[contenthash].css'
});

module.exports = {
	context: path.join(process.cwd(), 'src'), //the home directory for webpack
	devtool: 'source-map', // enhance debugging by adding meta info for the browser devtools
	entry: {
		app: './index.js'
	},
	output: {
		path: path.join(process.cwd(), 'dist'),
		filename: '[name].[hash].js',
		publicPath: '/',
		sourceMapFilename: '[name].map'
	},
	resolve: {
		extensions: ['.js'],  // extensions that are used
		modules: [path.join(process.cwd(), 'src'), 'node_modules'] // directories where to look for modules
	},
	module: {
		rules: [{
			enforce: 'pre', //to check source files, not modified by other loaders (like babel-loader)
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "eslint-loader"
		},{
			// match all .gltf files
			test: /\.(gltf)$/,
			loader: 'gltf-loader-2'
		},{
			// here I match only IMAGE and BIN files under the gltf folder
			test: /src\/glTF\/.*\.(bin|png|jpe?g|gif)$/,
			// or use url-loader if you would like to embed images in the source gltf
			loader: 'file-loader',
			options: {
				// output folder for bin and image files, configure as needed
				name: 'gltf/[name].[hash:7].[ext]'
			}
	  },{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['env']
				}
			}
	  },{
			test: /\.scss$/,
			use: extractSass.extract({
				use: [{
					loader: 'css-loader',
					options: {
						sourceMap: true
					}
				}, {
					loader: 'sass-loader',
					options: {
						sourceMap: true
					}
				}],
				// use style-loader in development
				fallback: 'style-loader'
			})
		}]
	},
	plugins: [
		new CleanWebpackPlugin(['dist'], {root: process.cwd()}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new HtmlWebpackPlugin({
			template: 'index.html'
		}),
		extractSass
	]
};
