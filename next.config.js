/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./app/i18n.ts');
const nextConfig = withNextIntl({
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  // webpack(config) {
  //   config.experiments = {
  //     ...config.experiments,
  //     topLevelAwait: true,
  //   };
  //   return config;
  // },
});

module.exports = nextConfig;
