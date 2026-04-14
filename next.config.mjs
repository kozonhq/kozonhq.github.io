/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',      // This creates the 'out' folder for GitHub
  images: {
    unoptimized: true,   // Required because GitHub Pages doesn't have an image server
  },
};

export default nextConfig;