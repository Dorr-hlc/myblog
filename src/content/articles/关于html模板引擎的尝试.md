---
title: 关于html模板引擎的尝试
date: 2023-08-03
tags:
  - JavaScript
---
# 背景

前端模板引擎是一种用于在前端开发中生成动态HTML内容的工具。它们允许开发人员通过在模板中插入变量、表达式和控制结构来创建可重用的、动态的页面内容。模板引擎可以帮助开发人员将数据和UI分离，使得前端代码更易于维护和扩展。

以下是一些常见的前端模板引擎：

1. **Mustache.js** : Mustache 是一个简单、无逻辑的模板引擎，支持多种编程语言。它使用双大括号 `{{}}` 来包裹变量，并且可以嵌套在HTML中。Mustache 的设计哲学是尽量简洁，只关注变量的替换。
2. **Handlebars.js** : Handlebars 是在 Mustache 基础上扩展而来的模板引擎。它支持更多的控制结构，例如条件语句和循环。Handlebars 使用 `{{}}` 包裹变量，使用 `{{#if}}`、`{{#each}}` 等标签来实现逻辑控制。
3. **EJS (Embedded JavaScript)** : EJS 允许在模板中嵌入 JavaScript 代码。它使用 `<% %>` 标签来包裹 JavaScript 代码，使用 `<%= %>` 输出变量的值。EJS 可以更灵活地处理复杂的逻辑和交互。
4. **Pug (formerly Jade)** : Pug 是一种基于缩进的模板语言，它使用缩进和特定的标记来表示HTML结构和逻辑。Pug 的语法非常紧凑，适用于需要简洁代码的项目。
5. **Vue.js Templates** : Vue.js 是一个流行的前端框架，它内置了一种基于HTML的模板语法。Vue 的模板语法允许你将数据和DOM绑定起来，并实现动态更新。
6. **React JSX** : 虽然不是严格意义上的模板引擎，但 React 使用 JSX 语法来描述UI组件。JSX 允许开发人员在JavaScript中编写类似HTML的代码，然后通过编译转换为真实的JavaScript代码。

针对公司情况，我尝试了两种模板引擎的使用，一种活动页面是基于JSRENDER的轻量级的 JavaScript 模板引擎，直接在页面中引入js,通过在模板中定义变量，通过Js去加载不同的模板数据，在浏览器中渲染；一种是通过Mustache.js+gulp实现在本地就实现模板引擎的转换，直接生成对应的html文件，这种形式可能适合于批量改版的时候。具体如下：

## 第一种：JSRENDER+JQUERY

template.js

```js
// template.js
__pubTem = {
  tdkTemplate: function () {
    var template = `
            <title>{{title}}</title>
            <meta name="description" content="{{description}}">
            <meta name="keywords" content="{{keywords}}">
          `;
    return template;
  },
 
```

通过js函数的形式，去对各个板块进行一个组件化，然后在public.js,去通过判断语言去加载不同的json文件，从而实现活动的维护更新

**public.js**

```js
let __pub = {
  getLang: function () {
    let langs = ["fr", "jp", "de", "it", "pt", "es", "tw", "zh", "en", "ar"];
    let _lang = window.location.pathname.substring(1).split("/")[0];
    _lang.length > 2 &&
      (_lang = window.location.pathname.substring(1).split("/")[1]);
    let lang = langs.indexOf(_lang) > -1 ? _lang : "en";
    if (host === "www.aomei.de") {
      lang = "de";
    } else {
      if (host === "www.aomei.fr") {
        lang = "fr";
      } else {
        if (host === "www.aomei.jp") {
          lang = "jp";
        }
      }
    }
    return lang;
  },
};
$.get("text-en.json", function (res) {
  var tdkTm = __pubTem.tdkTemplate();
  var html = $.templates(tdkTm).render(res.tdk);
  $("head").append(html);
});

```

**text-en.json**

## 第二种：GULP+Mustache.js

这个可以直接放置在项目中，支持热更新，每修改一次文件内容，都会直接输出最新的文件到指定的项目文件夹。

大致操作如下，在gulp项目中创建一个src目录，src目录下创建一个data目录用于存放页面的渲染数据文件，再创建一个templates文件夹，用于存放页面的模板文件。

前提注意这两个目录的文件名以及文件层级需要保持一致，比如/templates/a.mustache,就是直接去找/data/a.js。最终会实时生成a.html放置到dist目录中。

**举例**

a.tem

```html
<!DOCTYPE html>
<html lang="{{lang}}">
<body></body>

</html>
```

**a.js**

```js
module.exports = {
  lang: "今天是周五",
};

```

a.html

```html
<!DOCTYPE html>
<html lang="今天是周五">
<body></body>

</html>
```

## 总结

当涉及到前端模板引擎时，Mustache.js 和 jsRender 都是非常受欢迎的选择，它们在设计和用法上有一些区别。以下是 Mustache.js 和 jsRender 的区别以及它们的使用总结：

**区别：**

1. **语法和功能** ：

* Mustache.js：采用非常简单的语法，主要关注数据的替换，不支持逻辑控制。语法使用双大括号 `{{}}` 包裹变量。
* jsRender：扩展了 Mustache.js 的功能，除了数据替换外，还支持逻辑控制、条件语句、循环等。语法也使用 `{{...}}`，但支持更多的功能。

1. **逻辑控制** ：

* Mustache.js：仅用于数据插入，不支持直接的逻辑控制，因此你需要在传入的数据中处理逻辑。
* jsRender：支持条件语句、循环等逻辑控制，能够更灵活地根据数据动态生成内容。

1. **复杂性** ：

* Mustache.js：设计简单，适用于那些只需要进行简单数据替换的场景。
* jsRender：更强大且复杂，适用于需要更多逻辑和控制的情况。

**Mustache.js 使用：**

1. 在 HTML 中引入 Mustache.js 库文件。
2. 定义 Mustache 模板，使用 `{{...}}` 包裹需要插入的变量。
3. 使用数据对象填充模板并渲染。
