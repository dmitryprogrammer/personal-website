import {dirname, join, resolve} from 'path';
import {fileURLToPath} from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: ['./src/main.tsx'],
  output: {filename: '[name].js', path: resolve(__dirname, 'dist')},
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          {loader: 'sass-loader', options: {sourceMap: true}}
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [new HtmlWebpackPlugin({template: './index.html'})],
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    hot: true,
    static: {
      directory: join(__dirname, 'public'),
      publicPath: '/public',
      watch: true
    },
    open: true,
    compress: true,
    allowedHosts: 'all',
    port: 8000
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  }
};
