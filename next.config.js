/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb'
    }
  },
  env: {
    AWS_REGION: process.env.REGION || 'us-east-1'
  }
}

module.exports = nextConfig
