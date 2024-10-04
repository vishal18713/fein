// next.config.js

module.exports = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.js$/,
      include: /web3_contracts/,
      use: 'ignore-loader'
    });
    
    return config;
  },
};
