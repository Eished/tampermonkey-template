const { resolve } = require('path');
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonMeta = require('./src/common.meta.json');

const year = new Date().getFullYear();
const getBanner = (meta) => `// ==UserScript==\n${Object.entries(Object.assign(commonMeta, meta))
  .map(([key, value]) => {
    if (Array.isArray(value)) {
      return value.map((item) => `// @${key.padEnd(20, ' ')}${item}`).join('\n');
    }
    return `// @${key.padEnd(20, ' ')}${value.replace(/\[year\]/g, year)}`;
  })
  .join('\n')}
// ==/UserScript==
/* eslint-disable */ /* spell-checker: disable */
// @[ You can find all source codes in GitHub repo ]`;

const relativePath = (p) => path.join(process.cwd(), p);
const src = relativePath('src');

module.exports = (env) => {
  const PRODUCTION = env.production;

  const banner = {};
  if (!PRODUCTION) {
    banner.name = '斗鱼直播助手-dev';
    banner.namespace = 'douyu-helper-dev';
    banner.match = ['*://*.douyu.com/*', '*://*.localhost/*'];
    banner.require = ['file://\\\\wsl$\\Ubuntu-20.04\\home\\eis\\web\\douyu-helper\\dist\\douyu.dev.user.js'];
  }

  const options = {
    entry: './src/index.ts',
    output: {
      path: resolve(__dirname, 'dist'),
      filename: PRODUCTION ? 'douyu.user.js' : 'douyu.dev.user.js',
      publicPath: '/',
    },
    externals: {},
    module: {
      rules: [
        {
          test: /\.(js|jsx|mjs)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                // 预设：指示babel做怎么样的兼容性处理。
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      corejs: {
                        version: 3,
                      }, // 按需加载
                      useBuiltIns: 'usage',
                    },
                  ],
                ],
              },
            },
          ],
        },
        {
          test: /\.(tsx|ts)?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
          include: [src],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
          include: /node_modules/,
        },
        {
          test: /\.css$/,
          // 使用哪些 loader 进行处理
          use: [
            // use 数组中 loader 执行顺序：从右到左，从下到上 依次执行
            // 创建 style 标签，将 js 中的样式资源插入进行，添加到 head 中生效
            // GM_addStyle 不需要 style-loader
            // 'style-loader',
            'to-string-loader',
            // 将 css 文件变成 commonjs 模块加载 js 中，里面内容是样式字符串
            // esModule: false 可以 toString()
            {
              loader: 'css-loader',
              options: {
                esModule: false,
              },
            },
          ],
          include: [src],
        },
        {
          test: /\.less$/,
          // 使用哪些 loader 进行处理
          use: [
            // use 数组中 loader 执行顺序：从右到左，从下到上 依次执行
            // 创建 style 标签，将 js 中的样式资源插入进行，添加到 head 中生效
            'style-loader',
            // 将 css 文件变成 commonjs 模块加载 js 中，里面内容是样式字符串
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
      ],
    },
    optimization: {
      minimize: false,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: /==\/?UserScript==|^[ ]?@|eslint-disable|spell-checker/i,
            },
          },
          extractComments: false,
        }),
      ],
    },
    watchOptions: {
      ignored: /node_modules/,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
      alias: {
        '@': src,
      },
    },
    mode: PRODUCTION ? 'production' : 'development',
    devtool: 'source-map',
    plugins: [
      new webpack.BannerPlugin({
        banner: getBanner(banner),
        raw: true,
        entryOnly: true,
      }),
      new webpack.DefinePlugin({
        PRODUCTION,
      }),
    ],
  };

  if (!PRODUCTION) {
    options.devServer = {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 8080,
      hot: true,
      open: true,
      watchFiles: ['src/**/*.ts', 'public/'], // 配合 HtmlWebpackPlugin 才能热刷新，热刷新代码在注入的 js 里面
    };
    options.plugins.push(
      new HtmlWebpackPlugin({
        template: './public/index.html',
        inject: 'head',
      })
    );
  }

  return options;
};
