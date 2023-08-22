---
title: JQuery 中slidedown和slideup函数使用注意
date: 2022-01-19
tags:
  - JavaScript
---

本篇博客主要是对 JQuery 中slidedown和slideup函数使用注意
<!-- more -->
## 数据类型
关于Juqery 中 slidedown和slideup 的使用
在项目中通常使用上述两个函数来控制样式的显示与隐藏，比如希望控制图片中红色方框内的文字显示隐藏
![](https://cdn.nlark.com/yuque/0/2022/png/25736107/1641542723576-d661e52c-36cd-4234-bbfd-9371492cf5a9.png)



## 原因
如果控制显示隐藏的是行内元素或者行内块元素的时候，就会出现抖动，动画不顺畅的情况，因为jquery 在控制显示隐藏的时候会给行内块元素添加style="inline-block",而不是style="block".
## 解决办法
将控制显示隐藏的元素修改为块级元素，比如p, div 等