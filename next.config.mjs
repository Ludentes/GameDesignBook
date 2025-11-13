import { createMDX } from 'fumadocs-mdx/next';

const isProd = process.env.NODE_ENV === 'production'
const repoName = 'GameDesignBook'
const withMDX = createMDX();

// /** @type {import('next').NextConfig} */
// const config = {
//   reactStrictMode: true,
// };

// 


/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
   basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
  images: {
    unoptimized: true
  },

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,
};

export default withMDX(nextConfig);