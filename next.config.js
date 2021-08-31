/** @type {import('next').NextConfig} */

const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');
const {
  getGlobalCssLoader,
} = require('next/dist/build/webpack/config/blocks/css/loaders');
const {
  default: MiniCssExtractPlugin,
} = require('next/dist/compiled/mini-css-extract-plugin/index');

module.exports = {
  reactStrictMode: true,
  webpack(config, options) {
    const { dev, isServer } = options;

    config.module.rules.push({
      test: /\.css$/i,
      sideEffects: true,
      use: dev
        ? getGlobalCssLoader(
          {
            assetPrefix: config.assetPrefix,
            future: {
              webpack5: true,
            },
            isClient: !isServer,
            isServer,
            isDevelopment: dev,
          },
          [],
          []
        )
        : [MiniCssExtractPlugin.loader, 'css-loader'],
    });

    config.plugins.push(new VanillaExtractPlugin());

    if (!dev) {
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: 'static/css/[contenthash].css',
          chunkFilename: 'static/css/[contenthash].css',
          ignoreOrder: true,
        })
      );
    }

    return config;
  },
}
