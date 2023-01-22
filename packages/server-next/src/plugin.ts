export const nextPlugin = (nextConfig: any) =>
  Object.assign({}, nextConfig, {
    webpack(config: any, options: any) {
      if (!options.isServer) {
        config.module.rules.push({
          test: /pages\/api\/.*/,
          use: {
            loader: "@powerpc/webpack-loader",
            options: { apiUrl: (path: string) => `/api${path}` },
          },
        });
      }

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
