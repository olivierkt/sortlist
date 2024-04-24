// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  site: {
    url: 'https://www.kom-digital.com',
  },

  css: ["@/assets/css/main.css"],

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width,initial-scale=1,maximum-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    }
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/google-fonts',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/test-utils/module'
  ],

  sitemap: {
    autoLastmod: true,
    discoverImages: false,
  },

  nitro: {
    compressPublicAssets: {
      brotli: true
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL
    }
  },
  
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  build: {
    extractCSS: false,
  }
})
