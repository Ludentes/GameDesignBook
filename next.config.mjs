import { createMDX } from 'fumadocs-mdx/next';


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

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,
};

export default withMDX(nextConfig);