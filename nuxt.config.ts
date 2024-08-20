// https://nuxt.com/docs/api/configuration/nuxt-config
import { NuxtConfig, defineNuxtConfig } from 'nuxt/config';
export default defineNuxtConfig({
    target: "static",
    srcDir: 'src/',
    modules: [
        '@nuxt/content',
        '@pinia/nuxt',
        '@element-plus/nuxt',
        '@nuxtjs/device',
    ],

    content: {
        highlight: {
            preload: [
                'javascript',
                'typescript',
                'vue',
                'vue-html'
            ],
        },
    },

    css: [
        "@/assets/css/main.css",
    ],
    app: {
        baseURL: '/',
        head: {
            title: '侯某的个人网站',
            meta: [
                {
                    name: "description", content: "前端相关的博客"
                }
            ],
            link: [
                { rel: 'apple-touch-icon', sizes: "180x180", type: 'image/x-icon', href: '/apple-touch-icon.png' },
                { rel: 'icon', sizes: "32x32", type: 'image/png', href: '/favicon-32x32.png' },
                { rel: 'icon', sizes: "16x16", type: 'image/png', href: '/favicon-16x16.png' },
                { rel: 'manifest', href: '/site.webmanifest' },
                { rel: 'shortcut icon', type: "image/x-icon", href: '/favicon.ico' },
            ],
        }
    }
} as unknown as NuxtConfig)
