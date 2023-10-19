const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      fs: false,
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      url: require.resolve("url"),
      util: require.resolve("util"),
      zlib: require.resolve("browserify-zlib"),
    },
  },
};
