const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.handlebars',
      title: 'Skila',
    }),
    new HtmlWebpackPlugin({
      template: './src/how-it-works.handlebars',
      filename: 'how-it-works.html',
      title: 'Skila · How it works',
    }),
    new HtmlWebpackPlugin({
      template: './src/free-trial.handlebars',
      filename: 'free-trial.html',
      title: 'Skila · Free trial',
    }),
    // new HtmlWebpackPlugin({
    //   template: './src/more-info.handlebars',
    //   filename: 'more-info.html',
    //   title: 'Skila · More information',
    // }),
    new HtmlWebpackPlugin({
      template: './src/contact-us.handlebars',
      filename: 'contact-us.html',
      title: 'Skila · Contact us',
    }),
    new HtmlWebpackPlugin({
      template: './src/privacy.handlebars',
      filename: 'privacy.html',
      title: 'Skila · Privacy policy',
    }),
    new HtmlWebpackPlugin({
      template: './src/terms.handlebars',
      filename: 'terms.html',
      title: 'Skila · Terms & Conditions',
    }),
    // new HtmlWebpackPlugin({
    //   template: './src/about-us.handlebars',
    //   filename: 'about-us.html',
    //   title: 'Skila · About us',
    // }),
    // new HtmlWebpackPlugin({
    //   template: './src/blogs/sustainable-post-purchase-experience.handlebars',
    //   filename: 'sustainable-post-purchase-experience.html',
    //   title:
    //     'Skila · How To Create A Sustainable Post-Purchase Experience For Customers',
    // }),
    // new HtmlWebpackPlugin({
    //   template:
    //     './src/blogs/unlock-the-power-of-post-purchase-management.handlebars',
    //   filename: 'unlock-the-power-of-post-purchase-management.html',
    //   title:
    //     'Skila · Unlock the Power of Post-Purchase Management for Small & Medium-Sized E-Commerce Businesses',
    // }),
    // new HtmlWebpackPlugin({
    //   template: './src/blogs/boost-your-ecommerce-roi.handlebars',
    //   filename: 'boost-your-ecommerce-roi.html',
    //   title:
    //     'Skila · Boost Your E-Commerce ROI with Effective Post-Purchase Management Strategies',
    // }),
    // new HtmlWebpackPlugin({
    //   template:
    //     './src/blogs/unlock-the-power-of-skilas-data-export-feature.handlebars',
    //   filename: 'unlock-the-power-of-skilas-data-export-feature.html',
    //   title: `Skila · Unlock the Power of Skila's Data Export Feature for Business Growth`,
    // }),
    // new HtmlWebpackPlugin({
    //   template: './src/blogs/optimizing-post-purchase-management.handlebars',
    //   filename: 'optimizing-post-purchase-management.html',
    //   title: `Skila · Boosting Eco-Friendliness in E-Commerce: Optimizing Post-Purchase Management for Sustainability`,
    // }),
    // new HtmlWebpackPlugin({
    //   template: './src/blogs/unlock-cost-savings-in-ecommerce.handlebars',
    //   filename: 'unlock-cost-savings-in-ecommerce.html',
    //   title: `Skila · Unlock Cost Savings in E-Commerce: Boost Your Business with Efficient Post-Purchase Management`,
    // }),
    // new HtmlWebpackPlugin({
    //   template: './src/blogs/strengthen-customer-loyalty.handlebars',
    //   filename: 'strengthen-customer-loyalty.html',
    //   title: `Skila · Strengthen Customer Loyalty in E-Commerce with Effective Post-Purchase Management`,
    // }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'assets', to: 'assets' }],
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    watchFiles: path.join(__dirname, 'src'),
    hot: true,
  },
  module: {
    rules: [
      { test: /\.handlebars$/, loader: 'handlebars-loader' },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false } },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
}
