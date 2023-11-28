---
title: Core Web Vitals性能优化
date: 2023-11-21
tags:
  - 公共JS
---
## 背景

Core Web Vitals（核心网络性能指标）是由谷歌提出的一组用于评估网站用户体验的重要性能指标。这些指标主要关注网页加载速度、交互性和视觉稳定性，是评估用户感知的关键因素。Core Web Vitals的目标是帮助网站所有者和开发者更好地理解和优化其网站，以提供更好的用户体验。

 包含以下三个指标:

如下图所示：

![](https://cdn.jsdelivr.net/gh//Dorr-hlc/pic.bed@main/360%E6%88%AA%E5%9B%BE18720121104141143.png)

1. **Largest Contentful Paint (LCP)** （最大内容绘制时间）：衡量页面加载速度的指标，表示从用户点击链接到页面上最大的可见元素完全呈现的时间。理想情况下，LCP应在用户点击后的 2.5 秒内发生。
2. **First Input Delay (FID)** （首次输入延迟）：衡量页面的交互性，表示用户首次与页面交互（点击链接、按钮等）到浏览器实际响应的时间。理想情况下，FID应在 100 毫秒以内。
3. **Cumulative Layout Shift (CLS)** （累积布局偏移）：衡量页面的视觉稳定性，表示在页面加载过程中元素发生不可预测的布局变化的总和。CLS 应小于 0.1，以确保页面不会因为元素的突然移动而导致用户体验不佳。

这些指标为网站提供了一种评估用户体验的标准，帮助开发者识别和解决页面性能问题。特别是在搜索引擎优化（SEO）方面，Core Web Vitals的表现也对网站在谷歌搜索结果中的排名产生影响。因此，关注和优化这些核心指标对于提升网站性能和用户体验至关重要。

## HTML 性能的一般注意事项

1. 尽量减少重定向
2. 缓存html响应
3. 衡量服务器的响应时间
4. 压缩资源文件
5. 优化资源加载

因为公司目前的网站页面几乎都是用纯静态的html去编写的，因此我们能做的也就是第4点压缩资源文件和第5点优化资源加载。针对以上这两点我们需要做哪些？

### 压缩资源文件

所谓的资源文件无非就是css,js,image,其中image占用空间的大小最多，因此从压缩资源文件我们需要做如下几点。

1. 在编写less文件的时候使用easy less插件的时候应该将其设置为自动压缩。如下图：

![](https://cdn.jsdelivr.net/gh//Dorr-hlc/pic.bed@main/20231123154433.png)

2.压缩图片

之前的png图片，部分背景图甚至高达1.3m，因此我们在使用图片的时候还是要注意下图片的大小，图片太大的要进行适量的压缩，以下是我使用比较多的在线压缩网站（https://tinypng.com/）

![](https://cdn.jsdelivr.net/gh//Dorr-hlc/pic.bed@main/20231123154959.png)

### 优化资源加载

实现对资源的优化加载对性能的评分也是非常重要的，以下是我目前发现公司网站中能够优化的点：

#### **图片相关**

**1.非必要不使用雪碧图**

以UB首页为例，如下图，我使用了一个搜索的icon，这里却需要引入一张70多kb的图片，而这张精灵图的其他的icon在当前网页中并没有使用，因此对于此类较小的icon图,推荐单个的svg图或者.webp图

![](https://cdn.jsdelivr.net/gh//Dorr-hlc/pic.bed@main/20231123160211.png)

**2.延迟图片请求**

可以将 [`loading` 属性](https://developer.mozilla.org/docs/Web/HTML/Element/iframe#attributes)添加到 `<img>` 元素中，以告知浏览器应如何加载它们：

* `"eager"` 会通知浏览器应立即加载图片，即使图片位于初始视口之外也是如此。这也是 `loading` 属性的默认值。
* `"lazy"` 会延迟加载图片，直到图片在与可见视口的距离内。此距离因浏览器而异，但通常设置得足够大，以便在用户滚动到图片时加载图片。

**重要提示** ：如前所述，使用 `loading="lazy"` 属性时，浏览器判定需要使用相应图片的[视口距离](https://web.dev/articles/browser-level-image-lazy-loading?hl=zh-cn#distance-from-viewport_thresholds)因浏览器而异。涉及的因素可能包括[有效连接类型](https://googlechrome.github.io/samples/network-information/)以及映像类型。

另外值得注意的是，如果您使用的是 `<picture>` 元素，则 `loading` 属性仍应应用于其子级 `<img>` 元素，而不是 `<picture>` 元素本身。这是因为 `<picture>` 元素是一个容器，其中包含指向不同候选图片的额外 `<source>` 元素，并且浏览器选择的候选图片直接应用于其子级 `<img>` 元素。而我们网站目前正在使用的是lazysizes.min.js插件实现加载视口区域的图片，并且支持响应式，具体的使用方式请自行查阅。

**提示：**

请勿延迟加载初始视口中的图片，也就是我们所熟悉的banner区域，在这个区域中的图片尽量不使用懒加载，只能向位于初始视口之外的 `<img>` 元素添加 `loading="lazy"` 属性。不过，在呈现网页之前了解元素在视口中的确切位置可能会很复杂。必须考虑不同的视口尺寸、宽高比和设备。因此，在某些情况下，您应该避免应用 `loading="lazy"`，这非常明显。例如，如果是主打图片，或是在任何设备上，`<img>` 元素可能展示在首屏或布局顶部，您都应该从 `<img>` 元素中省略 `loading="lazy"` 属性。这[对于可能是 LCP 候选项的图片更为重要](https://web.dev/articles/lcp-lazy-loading?hl=zh-cn)。切勿为“首屏”图片指定 `loading="lazy"`，因为将请求延迟到网页呈现之后，可能会对您的 LCP 得分产生巨大的负面影响。其次，使用 `fetchpriority="high"` 可以告知浏览器此图片的传输优先级高于网页上其他位置的图片。

延迟加载的图片需要等待浏览器完成布局[](https://web.dev/articles/howbrowserswork?hl=zh-cn#layout)，以便了解图片的最终位置是否位于视口内。这意味着，如果可见视口中的 `<img>` 元素具有 `loading="lazy"` 属性，则只有在所有 CSS 已下载、解析并应用到页面之后才会请求该属性，而不是在[在原始标记中被预加载扫描程序发现](https://web.dev/articles/preload-scanner?hl=zh-cn#whats_a_preload_scanner)后立即提取。

由于所有主流浏览器都支持 [`<img>` 元素上的 `loading` 属性](https://caniuse.com/loading-lazy-attr)，因此无需使用 JavaScript 延迟加载图片，因为向网页添加额外的 JavaScript 来提供浏览器已提供的功能会影响网页性能的其他方面（例如 INP）。

##### JavaScript 延迟加载库

需要延迟加载 `<video>` 元素、`<video>` 元素 `poster` 图片、CSS `background-image` 属性加载的图片或其他不受支持的元素，可以使用基于 JavaScript 的延迟加载解决方案（例如 [lazysizes](https://github.com/aFarkas/lazysizes) 或 [yall.js](https://github.com/malchata/yall.js)）执行此操作，因为延迟加载这些类型的资源并不是浏览器级别的功能。

具体而言，在没有音轨的情况下自动播放和循环播放 `<video>` 元素[比使用动画 GIF 更高效](https://web.dev/articles/replace-gifs-with-videos?hl=zh-cn)，后者往往比具有同等视觉效果的视频资源大好几倍。即便如此，这些视频在带宽方面仍然非常重要，因此延迟加载它们是一种额外的优化，可以在很大程度上减少浪费的带宽。

其中大多数库通过使用 [Intersection Observer API](https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API) 以及 [Mutation Observer API](https://developer.mozilla.org/docs/Web/API/MutationObserver)（如果网页的 HTML 在初始加载后发生变化）来识别元素何时进入用户视口。如果图片可见或接近视口，则 JavaScript 库会使用正确的属性（例如 `src`）替换非标准属性（通常是 `data-src` 或类似属性）。举例如下：

```javascript
            <img data-src="/assets/images/download/v2/ab-download-img-version@2x.png" class="lazyload" width="468"
                height="300" alt="" srcset="">
```

**衡量图片的影响**

这里涉及到一个累计布局偏移，[Cumulative Layout Shift](https://web.dev/articles/cls?hl=zh-cn) (CLS) 是衡量视觉稳定性的指标。它是一项指标，用于捕获在资源加载和网页呈现时，网页上内容布局的偏移程度。由于延迟网页字体或图片来源突然呈现，或者互动元素突然从指针移开，因此任何花费大量时间使用网页的用户都因为页面“跳跃”而失去位置。高 CLS 最多是一种麻烦，在最坏的情况下是会导致用户出错的原因：例如，在用户点击时，“取消”按钮会转移到以前由“确认”按钮占用的空间。

由于加载时间较长以及它们在布局中可占据的空间量很大，这表明图片是导致 CLS 得分较高的常见原因。因此，应始终对 `<img>` 使用 `height` 和 `width` 属性，其值与图片来源的固有尺寸匹配，前提是您确保指定了 `height: auto` 和 `max-width: 100%` 来替换 HTML 属性中的高度。

```html
<img src="image.jpg"height="200"width="400"alt="…">
```

```css

img {
  max-width:100%;
  height: auto;
}
```

**关于img标签的使用优化**

添加图片的主要方法是 [`<img>`](https://developer.mozilla.org/docs/Web/HTML/Element/img) 标记（通过 `src` 属性引用图片资源）和 `alt` 属性（用于描述图片）。

```html
<img src="images/eve.png" alt="Eve">
```

`<img>` 上的 [`srcset`](https://web.dev/learn/images/descriptive?hl=zh-cn) 属性和 [`<picture>`](https://web.dev/learn/images/prescriptive?hl=zh-cn) 元素都提供了一种方法，可包含多个具有关联媒体查询的图片来源，每个图片来源都有一个后备图片来源，以便根据设备的分辨率、浏览器功能和视口尺寸提供最合适的图片文件。借助 `srcset` 属性，您可以根据分辨率、`sizes` 属性和浏览器视口大小提供多个图片版本。

```html
<img src="images/eve.png" alt="Eve"
  srcset="images/eve.png 400w, images/eve-xl.jpg 800w"
  sizes="(max-width: 800px) 400px, 800px" />
```

也可以使用 [`<picture>`](https://developer.mozilla.org/docs/Web/HTML/Element/picture) 元素以及 [`<source>`](https://developer.mozilla.org/docs/Web/HTML/Element/picture) 子元素（将 [`<img>`](https://developer.mozilla.org/docs/Web/HTML/Element/img) 作为默认来源）来完成此操作

```html
<picture>
  <source src="images/eve.png" media="(max-width: 800px)" />
  <source src="images/eve-xl.jpg" />
  <img src="images/eve.png" alt="Eve" />
</picture>
```

**注意：如果图片属于 SVG 文件类型，还应添加 [`role="img"`](https://developer.mozilla.org/docs/Web/Accessibility/ARIA/Roles/Img_role)。**

```html
  <img src="switch.svg" alt="light switch" role="img"/>
```

**移动端图片的优化**

1. 通过媒体查询将背景图设置为当前主题相近的颜色。
2. 隐藏非必要的大图，减少图片资源的加载
3. 采用响应式图片，在移动不使用2倍图，或者采用分辨率更低的图片。

#### **优化网络字体**

网页字体在加载和呈现时都会影响网页性能。较大的字体文件可能需要一段时间才能下载，并且会对 [First Contentful Paint (FCP)](https://web.dev/articles/fcp?hl=zh-cn) 产生负面影响，而不正确的 [`font-display` 值](https://developer.mozilla.org/docs/Web/CSS/@font-face/font-display)可能会导致导致网页的不良布局偏移，从而造成页面的 [Cumulative Layout Shift (CLS)](https://web.dev/articles/cls?hl=zh-cn)。

页面的网页字体是使用 `@font-face` 声明在样式表中定义的：

```css
@font-face {
  font-family:"Open Sans";
  src:url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2");
}
```

上述代码段定义了一个名为 `"Open Sans"` 的 `font-family`，并告知浏览器在哪里可以找到相应的网页字体资源。为了节省带宽，在确定当前页面的布局需要网页字体之前，浏览器不会下载网页字体。

```css
h1 {
  font-family:"Open Sans";
}
```

在上述 CSS 代码段中，浏览器会在解析页面 HTML 中的 `<h1>` 元素时下载 `"Open Sans"` 字体文件。

如果 `@font-face` 声明是在外部样式表中定义的，浏览器只能在下载样式表后开始下载。这会使网页字体的发现时间较晚，但也有办法帮助浏览器更快地发现网页字体。

您可以使用 `preload` 指令发起针对网页字体资源的提前请求。`preload` 指令可在网页加载早期阶段发现网页字体，浏览器会立即开始下载这些字体，无需等待样式表完成下载和解析。`preload` 指令不会等到网页上需要相应字体时再执行。

```
<!-- The `crossorigin` attribute is required for fonts—even
     self-hosted ones, as fonts are considered CORS resources. -->
<linkrel="preload"as="font"href="/fonts/OpenSans-Regular-webfont.woff2"crossorigin>
```

 **注意** ：应谨慎使用 `preload` 指令。过度使用 `preload` 指令可能会转移其他关键资源的带宽。如果使用过度，`preload` 指令可能会下载当前网页不需要的字体

此外，请务必注意，字体属于 CORS 资源。因此，在预加载字体时，即使它们是自托管的，您*必须*指定 `crossorigin` 属性。

内嵌 `@font-face` 声明

通过使用 [`<style>` 元素](https://developer.mozilla.org/docs/Web/HTML/Element/style)，您可以在 HTML 的 `<head>` 中内嵌会阻止渲染的 CSS（包括 `@font-face` 声明），从而在网页加载期间提早发现字体。在这种情况下，浏览器会在网页加载的早期发现网页字体，因为它不需要等待外部样式表下载。

**注意** ：只有在所有阻塞渲染的资源加载完毕后，浏览器才会开始下载字体文件。这意味着，如果您已内联 `@font-face` 声明，但其余 CSS 在外部样式表中，那么浏览器仍然需要等待外部样式表下载完毕。与使用 `preload` 提示相比，内嵌 `@font-face` 声明的优势在于，因为浏览器只会下载呈现当前网页所需的字体。这样可以消除下载未使用的字体的风险。

目前我们改版的网页使用一般都是自托管字体，通过第三方服务（例如 [Google Fonts](https://fonts.google.com/?hl=zh-cn)）提供，也可以在您的源站上自行托管。使用第三方服务时，您的网页需要先与提供商的网域建立连接，然后才能开始下载所需的网页字体。这可能会导致网页字体的发现和后续下载延迟。

使用 `preconnect` 资源提示可以减少此开销。借助 `preconnect`，您可以告知浏览器比浏览器通常尽快打开跨源连接：

```html
    <!-- font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
    <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet">
    <!-- font -->
```

上述 HTML 代码段会提示浏览器与 `fonts.googleapis.com` 建立连接并与 `fonts.gstatic.com` 建立 [CORS](https://developer.mozilla.org/docs/Web/HTTP/CORS) 连接。某些字体提供程序（如 Google Fonts）会提供来自不同来源的 CSS 和字体资源。


## 总结

以上就是我最近对网页性能优化的一些粗略的总结，上述的方法优化之后已经能够使当前的网页性能分数前进一大步，但是具体能做的还有很多,参照以下，比如对js的优化之类的，部分资源的预加载等,以下就是对上线页面的性能测试地址以及其他的

测试性能网址：https://pagespeed.web.dev/?sjid=7722822665498084982-AP

网页性能文档：https://web.dev/learn/images
