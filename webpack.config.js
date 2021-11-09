const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  let mode = 'development';
  if (argv.mode === 'production') {
    mode = 'production';
  }
  console.log(mode + ' mode');

  return {
    mode: mode,
    plugins: [
      new MiniCssExtractPlugin({
        filename: './styles/[name].[contenthash].css',
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            mode === 'development'
              ? 'style-loader'
              : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      'postcss-preset-env',
                      {
                        // Options
                      },
                    ],
                  ],
                },
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
  };
};
