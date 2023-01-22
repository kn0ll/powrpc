module.exports = {
  webpack: (config, options) => {
    if (!options.isServer) {
      config.module.rules.push({
        test: /pages\/api\/.*/,
        use: {
          loader: "@pow-rpc/webpack-loader",
          options: { apiUrl: (path) => `/api${path}` },
        },
      });
    }

    return config;
  },
};
