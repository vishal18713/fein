// next.config.js

module.exports = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.js$/,
      include: /web3_contracts/,
      use: 'null-loader'
    });
    config.module.rules.push({
      test: /src\/testing\/page\.tsx$/,
      use: 'null-loader',
    });
    return config;
  },
  images: {
    domains: ['emerald-managerial-firefly-535.mypinata.cloud']
  }
};