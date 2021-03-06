const path  =  require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const autoprefixer = require("autoprefixer");

const paths = {
	src: path.resolve(__dirname, "src"),
	dist: path.resolve(__dirname, "dist")
};
module.exports = {
	mode: "production",
	context: paths.src,
	entry: {
		app: "./index"
	},
	output: {
		path: paths.dist,
		filename: "[name].bundle.js"
	},
	resolve:{
		extensions:[".ts", ".tsx", ".js", ".jsx"]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.module\.s([ac])ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: "css-loader",
						options: {
							modules: {
								mode: 'local',
								exportGlobals: true,
								localIdentName: '[path]--[hash:base64:5]',
								context: path.resolve(__dirname, 'src'),
								hashPrefix: 'my-custom-hash',
							},
						},
					},
					{
						loader: "sass-loader",
					},
				],
			},
			{
				test: /\.(sa|sc|c)ss$/,
				exclude: /\.module.(s([ac])ss)$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
						},
					},
					{
						loader: 'sass-loader',
						options: { sourceMap: true },
					},
				],
			},
			{
				test: /\.(png|gif|jpe?g)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
						},
					},
					'img-loader',
				],
			},
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
						}
					}
				]
			},
			{
				test: /\.svg$/,
				use: [
					"babel-loader",
					{
						loader: "react-svg-loader",
						options: {
							svgo: {
								plugins: [
									{ removeTitle: false }
								],
								floatPrecision: 2
							}
						}
					}
				]
			},
		],
	},
	plugins: [
		new webpack.SourceMapDevToolPlugin({
			filename: "[name].js.map",
			exclude: ["bundle.js"],
		}),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: "[name].[hash].css",
			chunkFilename: "[id].[hash].css",
		}),
		new HtmlWebpackPlugin({
			filename: `${__dirname}/dist/index.html`,
			template:  `${__dirname}/public/index.html`,
			favicon: path.join(`${__dirname}/favicon.ico`)
		}),
	],
	optimization: {
		minimizer: [
			new ImageminPlugin({
				test: /\.(jpe?g|png|gif|svg)$/i,
				cache: true,
				imageminOptions: {
					plugins: [
						["gifsicle", { interlaced: true }],
						["jpegtran", { progressive: true }],
						["optipng", { optimizationLevel: 5 }],
						[
							"svgo", {
								plugins: [{ removeViewBox: false }] }]] }
			}),
			new OptimizeCssAssetsPlugin({
				cssProcessorOptions: { sourceMap: true },
			}),
		],
	},
};