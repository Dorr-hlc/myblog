---
title: vue深入浅出第1章
date: 2022-05-30
tags:
  - vue2
  - JavaScript
---
# 变化侦测

Js有两种侦测变化，一种事Object.defineProperty，一种就是es6的Proxy。

那么什么是Object.defineProperty？

这个方法接受3个参数：

1. 属性所在的对象
2. 属性的名字
3. 一个描述符对象

什么是描述符对象？

数据属性：

1. configurable:表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性，默认值为false。
2. enumerable：表示能否通过for in循环访问属性，默认值为false。
3. writable：表示能否修改属性的值。默认值为false。
4. value：包含这个属性的数据值。默认值为undefined。

**configurable属性解析**

```js
      let info = {
            name: "Dorr"
        }
        Object.defineProperty(info, "name", {
            configurable: false
        })
        delete info.name
        console.log(info.name);
```

上述代码可以发现当configurable的值时fasle 的时候，使用的delete是无法删除属性。而当其是true时，打印的info.name就是undefined。

**writable属性解析**，详细代码如下：

```js
        Object.defineProperty(info, "age", {
            writable: false,
            value: 15

        })
        info.age = 20
        console.log(info.age);//15
```

上述代码的意思就是我们给info对象新增一个名为age的属性，但是因为writable的是false，因此我们无法对age的值i进行修改。最后打印的值依然是15。

**enumerable属性解析**

当给这个属性的值设置为属性后，就无法使用迭代遍历器迭代出age属性的值。
