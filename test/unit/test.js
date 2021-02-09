const { join } = require('path');
const fs = require('fs');

const webpack = require('webpack');

const { WebpackManifestPlugin } = require('../../lib');

const outputPath = join(__dirname, '../output/unit', 'auxiliary-assets');
const config = {
  context: __dirname,
  entry: '../fixtures/import_image.js',
  output: {
    path: outputPath,
    assetModuleFilename: `images/[name].[hash:4][ext]`,
    filename: '[name].js',
    publicPath: ''
  },
  optimization: { chunkIds: 'named' },
  plugins: [new WebpackManifestPlugin({})],
  module: {
    rules: [
      {
        test: /\.(png)/,
        type: 'asset/resource'
      }
    ]
  }
};

const compiler = webpack(config);

compiler.run((error, stats) => {
  if (error) {
    throw error;
  }

  if (stats.hasErrors()) {
    console.log('Stat Errors', stats.toJson());
  }

  const manifest = fs.readFileSync(join(outputPath, 'manifest.json')).toString();

  console.log(manifest);
});
