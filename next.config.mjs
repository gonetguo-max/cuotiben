/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      }
    }
    
    config.externals = config.externals || []
    config.externals.push({
      'ws': 'ws',
      'bufferutil': 'bufferutil',
      'utf-8-validate': 'utf-8-validate',
    })
    
    return config
  },
}

export default nextConfig
