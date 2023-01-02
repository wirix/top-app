/** 
 * @type {import('next').NextConfig} 
 * */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push({
      loader: '@svgr/webpack',
      options: {
        prettier: false,
        svgo: true,
        svgoConfig: {
          name: 'preset-default',
          params: {
            overrides: {
              // disable plugins
              removeViewBox: false,
            },
          },
        },
        titleProp: true,
      },
      test: /\.svg$/,
    });

    return config;
  }
};

module.exports = nextConfig;
