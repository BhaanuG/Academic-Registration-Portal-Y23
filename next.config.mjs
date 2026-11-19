import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const makePublicPreviewOrigin = (() => {
  const publicURL = process.env.FIGMA_PUBLIC_URL
  if (!publicURL) return undefined

  try {
    return new URL(publicURL).host
  } catch {
    return undefined
  }
})()

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: path.resolve(dirname),
  },
  output: 'standalone',
  images: {
    loader: 'custom',
    loaderFile: './figma-image-loader.js',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: makePublicPreviewOrigin ? [makePublicPreviewOrigin] : [],
  enablePrerenderSourceMaps: false,
  experimental: {
    cpus: 2,
    serverActions: {
      allowedOrigins: makePublicPreviewOrigin ? [makePublicPreviewOrigin] : [],
    },
  },
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.FIGMA_PUBLIC_URL || 'http://localhost:3000',
  },
}

export default nextConfig
