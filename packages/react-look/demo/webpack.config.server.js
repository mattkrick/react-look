import path from 'path';
import webpack from 'webpack';

const root = path.join(process.cwd(), 'packages', 'react-look', 'demo');
// const a = path.resolve('./packages/react-look/demo/routes.js')
// console.log(a)
// console.log('root', root)
export default {
  context: root,
  entry: {prerender: './routes.js'},
  target: 'node',
  output: {
    path: path.join(root, '../build'),
    chunkFilename: '[name]_[chunkhash].js',
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    publicPath: '/static/'
  },
  // ignore anything that throws warnings & doesn't affect the view
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.txt$/, loader: 'raw-loader'},
      {test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/, loader: 'url-loader?limit=10000'},
      {test: /\.(eot|ttf|wav|mp3)$/, loader: 'file-loader'},
      {
        test: /\.(js|jsx)$/,
        loader: 'babel'
      }
    ]
  }
};
