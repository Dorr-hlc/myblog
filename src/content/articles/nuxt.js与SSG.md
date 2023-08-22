---
title: Nuxt.js与SSG
date: 2023-03-05
tags:
  - nuxt.js
---
# 什么是SSG？

SSG全称（Static Site Generator ），中文名就是静态站点生成器，是一种渲染模式，除此以外我还了解的有

* SSR 全称（Server-Side Rendering） 服务器端渲染
* CSR 全称（Client-Side Rendering） 客户端渲染
* ISR 全称（Incremental Static Regeneration） 增量静态再生

而我们接触最多的渲染模式应该是CSR，全称（Client-Side Rendering，也就是客户端渲染，页面的渲染其实就是浏览器将HTML文本转化为页面帧的过程。而如今我们大部分WEB应用都是使用 JavaScript 框架（Vue、React、Angular）进行页面渲染的，也就是说，求在执行 JavaScript 脚本的时候，HTML页面已经开始解析并且构建DOM树了，JavaScript 脚本只是动态的改变 DOM 树的结构，使得页面动态渲染。这个过程就叫客户端渲染。

SSR服务端渲染就是在浏览器请求页面URL时，服务端直接将我们需要的HTML文本组装好，并返回给浏览器，这个HTML文本被浏览器解析之后，不需要经过JavaScript脚本的执行，可直接构建出完整的DOM树并展示页面中。这个服务端组装的过程，叫做服务端渲染。而从服务器端请求URL获取数据的过程，是在页面加载之前完成的，该过程将首先运行特殊函数映射相关数据，并返回给客户端。在返回前存在一定（映射）延迟。

**ISR 全称（Incremental Static Regeneration） 增量静态再生：**
数据在构建时获取一次，在一定冷却时间后再次获取，并在第二次访问时提供。
增量静态再生是SSG和SSR的组合，它是静态服务的，但在特定的时间和条件下，页面将重新构建并再次从API获取数据。

而我们现在所学习的SSG 就是静态站点生成器：在构建时就会去获取一次数据，解析是在构建时执行的，当发出请求时，html 将静态存储，直接发送回客户端。因此SSG适合用来做纯静态网站，比如一些官网，博客之类的。

举例

```


     // 插入ga4跟踪代码
      script: [
        {
          type: "text/javascript",
          innerHTML: `var __pdl = ${JSON.stringify(this.ga4Json)}`,
        },
        {
          type: "text/javascript",
          src: "/js/team/publicdelores.js",
          body: true, //<script>是否在body中
        },
      ],
      __dangerouslyDisableSanitizers: ["script"], //避免插入的代码被转义成html
```

如上述代码所示，this.ga4Json是我在asyncData中去通过接口动态获取的json数据，然后在当前组件页面的head配置对象中去通过script标签插入到页面当中，因为是ssg应用，因此只会在我打包构建的时候去请求一次数据，并且innerHtml到我当前的页面中，这样上线以后就会减少对服务端的请求，提高访问速度。

# 什么是Nuxt.js

Nuxt.js其实就是一个基于vue的用于构建SSR、SSG应用的框架，我所熟知的还有Next.js,这个框架是基于React框架的。二者都是为了SPA模式下的一些不足，比如SEO等方面，因此我们要实现一个SSG 应用，可以直接使用Nuxt框架。以下是初步使用的步骤以及讲解。

1、使用命令行创建一个ssg应用。

注意：如果是第一次使用，还需要加上npx，因为需要安装create-nuxt-app 脚手架。

2、选择我们需要的配置项就开始下载安装，以下是我项目安装完成后的Nuxt.config.js的基础配置

```
/*
 * @Copyright: Copyright© 2022 AOMEI
 * @Abstract:
 * @Date: 2023-05-09 09:06:40
 * @Author:
 * @LastEditors: houliucun
 * @LastEditTime: 2023-05-09 14:09:38
 * @RevisionHistory:
 */
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",
  generate: {
    dir: "dist",
    fallback: false,
    subFolders: false,//打包时不以文件夹生成，但是其实无所谓，因为生成的dist目录依然是以目录形式的路由访问，而不是以文件html的格式去访问。
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "MC",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      {
        innerHTML: `(function(w, d, s, l, i) {
          w[l] = w[l] || [];
            w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-NP2JSQN');`,
      },
      {
        innerHTML: `! function(t, e, n, c, a, r, s) {
          t[n] = t[n] || function() {
              (t[n].q = t[n].q || []).push(arguments)
          }, (r = e.createElement(c)).async = 1, r.src = "https://www.clarity.ms/tag/cbhubgtzof",
         (s = e.getElementsByTagName(c)[0]).parentNode.insertBefore(r, s)
      }(window, document, "clarity", "script")`,
      },
    ],
    __dangerouslyDisableSanitizers: ["script"], //避免插入的代码被转义成html
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["@/plugins/GlobalComponent"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/proxy"],
  axios: {
    proxy: true,
  },
  proxy: {
    "/api": {
      target: "https://api.aomeisoftware.com", // 后台服务器的地址
      changeOrigin: true,
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};

```

如上诉代码所示，在nuxt.config.js文件中可以使用head去定义整个网站公共的TDK,css,js,这里需要注意的是引用的js或者css不能是assets文件夹下面，因为打包的时候默认会把assets文件夹下面的资源编译一次，因此要引用css或者js应该把资源放置在static文件夹下面。同样地，也可以将代码块插入到html中，如上面所示，我把谷歌公共的代码插入到html中，但是因为使用的是innerHTML，因此需要设置__dangerouslyDisableSanitizers: ["script"]，这样能够避免插入的js代码被转义，从而不会引起报错。

### 路由

在Nuxt中的默认路由就是根据pages文件夹下面的目录去产生，不需要自己再手动去指定路由。当然，如果你希望自己自定义路由，在nuxt.config.js中对应的路由配置选项中去定义的。
