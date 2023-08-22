---
title: blur与click冲突解决
date: 2022-04-22
tags:
  - JavaScript
---

本篇博客主要是对 关于在表单下拉选择中blur与click冲突解决
<!-- more -->

## 背景

在开发中我们会经常遇到blur和click冲突的情况。下面叙述了开发中常遇到的“下拉框选择”的问题，并提供了两种解决方案。
简述

## 简述

>●  blur事件

当元素失去焦点时触发blur事件；其为表单事件，blur和focus事件不会冒泡，其他表单事件都可以。

>● click事件

click事件：当点击元素时触发click事件；所有元素都有此事件，会产生冒泡。

**示例1：blur事件为表单事件**

``` stylus
<input type="text" id="tel">
<script>
    document.addEventListener("blur", function(){
        console.log("my document blur");
    });

    var ipt = document.getElementById("tel");
    ipt.addEventListener("blur", function(){
        console.log("my input blur");
    });
</script>
// 输出结果：document为非表单元素
my input blur
```

**示例2：click事件可以冒泡**

``` stylus
<input type="text" id="tel">
<script>
    document.addEventListener("click", function(){
        console.log("my document click");
    });

    var ipt = document.getElementById("tel");
    ipt.addEventListener("click", function(){
        console.log("my input click");
    });
</script>
// 输出结果：
my input click
my document click
```
**示例3：点击某元素导致前一个元素失去焦点，blur事件优先于click事件**

``` stylus
<input type="text" id="ipt">
<input type="button" id="btn" value="点我">
<script>
    var ipt = document.getElementById("ipt");
    ipt.addEventListener("blur", function(){
        console.log("my input blur");
    });

    var btn = document.getElementById("btn");
    btn.addEventListener("click", function(){
        console.log("my button click");
    });
</script>
// 输出结果：
my input blur
my button click
```
## 实例
实际开发中，我们会经常遇到某一下拉列表框，点击其他元素消失列表框；点击下拉框子元素使其生效的需求。这就会面临冲突问题。

``` stylus
<!-- DOM结构示意 -->
<input type="text" placeholder="请选择姓氏" readonly>
<div class="search-list" data-status="hide">
    <ul>
        <li><a href="javascript:">赵</a></li>
        <li><a href="javascript:">钱</a></li>
        <li><a href="javascript:">孙</a></li>
        <li><a href="javascript:">李</a></li>
    </ul>
</div>
```


``` stylus
/** 说明：
 *  目前通过ul外层div自定义属性“data-status”控制其是否显示   
 */
(function($){
    $("input").focus(function(){
        // input框获取焦点，展示下拉框
        $(".search-list").attr("data-status", "show");
    }).blur(function(){
        // input框失去焦点，隐藏下拉框
        $(".search-list").attr("data-status", "hide");
    });
    // 选择对应选项，并赋值给input框
    $(".search-list li a").click(function(){
        console.log("执行");
        $("input").val($(this).text());
    });
})(jQuery);
```

执行上述代码，会出现一个问题，并不能正确获取下拉框中某值。
**原因**：由于JavaScript为单线程，同一时间只能执行处理一个事件。由上述示例3，可得知“blur优先于click执行”。而在本示例中，由于blur处理程序，会将对应的下拉框展示区隐藏，所以导致其后续click事件并不会执行。上述console的信息也不会被输出。

## 解决办法

**1.对blur事件延迟**

``` stylus
(function($){
    $("input").focus(function(){
        // input框获取焦点，展示下拉框
        $(".search-list").attr("data-status", "show");
    }).blur(function(){
        setTimeout(function(){
            // input框失去焦点，隐藏下拉框
            $(".search-list").attr("data-status", "hide");
        }, 300);
    });
    // 选择对应选项，并赋值给input框
    $(".search-list li a").click(function(){
        console.log("执行");
        $("input").val($(this).text());
    });
})(jQuery);
```

**2.将click改为mousedown方法去执行**

``` stylus
<input type="text" id="ipt">
<input type="button" id="btn" value="点我">
<script>
    var ipt = document.getElementById("ipt");
    ipt.addEventListener("blur", function(){
        console.log("my input blur");
    });

    var btn = document.getElementById("btn");
    btn.addEventListener("mousedown", function(){
        console.log("my button mousedown");
    });
</script>
// 输出结果：
my button mousedown
my input blur
```


