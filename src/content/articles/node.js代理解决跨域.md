---
title: node.js代理解决跨域
date: 2022-03-05
tags:
  - node.js
---

# 步骤

****安装**[express](https://so.csdn.net/so/search?q=express&spm=1001.2101.3001.7020)和http-proxy-middleware**

前端在调接口的过程中往往会遇到跨域的问题，jq可以采取jsonp的方式，有时候我们也可以使用node.js代理解决跨域

```
npm install express --save
npm install http-proxy-middle --save
```

**跨域使用cors模块**


<img :src="$withBase('/images/2022-06-01.png')" alt="foo">


```
npm install cors --save
```

实例：下面是使用了UB 中的一个接口地址做了一下测试：

```
const express = require("express");
var { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const app = express();
app.use(cors());
// 服务器地址
const proxyOptions = {
  target: "https://www.ubackup.com/ss/license/info", //真实接口地址
  changeOrigin: true,
};

const exampleProxy = createProxyMiddleware(proxyOptions);
app.use("/", exampleProxy);

app.listen(3000, () => {
  console.log(`代理服务器成功启动在http://127.0.0.1:3000`);
});

```

**然后在命令行中输入node app.js,代理服务器就成功启动了**

**在页面中使用**

```
//随便测试一下
$.ajax({
  type: "POST",
  url: "http://127.0.0.1:3000/",
  data: {
    license: "AMAB-UPFMN-LAPKZ-GBTDK",
    lang: "en",
  },
});
```

## 原理和收获

因为跨域是针对浏览器来说的，服务器没有跨域请求。访问我们代理服务器的地址http://127.0.0.1:3000就可以转发到资源服务器上获取数据了，webpack代理请求也是通过 `http-proxy-middleware` 实现的。
