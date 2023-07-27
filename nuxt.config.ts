// https://nuxt.com/docs/api/configuration/nuxt-config
import { NuxtConfig } from 'nuxt/config';
export default defineNuxtConfig({
    target: "static",
    srcDir: 'src/', //指定app.vue 和pages目录都放在src目录下
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
        "@/assets/css/main.css"
    ],
    app: {
        baseURL: '/myblog/',
        head: {
            title: "HLC-BLOG",
            meta: [
                { name: 'description', content: '侯某的个人网站，主要记录前端相关学习博客' }
            ],
        },

    }
} as NuxtConfig)
