---
title: js高级进阶
date: 2022-07-05
tags:
  - JavaScript
---
## js高级——执行上下文

```stylus
        // 全局执行上下文
        console.log(a1, window.a1);
        window.a2();
        console.log(this);
        var a1 = 3
        function a2() {
            console.log('a2()');
        }
             console.log(a1);
     //   undefined undefined
     // a2()
     // 25 Window {window: Window, self: Window, document: document,      name: '', location: Location, …}
     // 30 3
```

## 改变函数内this指向

**call()**

```stylus
        // 1. call()
        var o = {
            name: 'hlc'
        }
        function fn(a, b) {
            console.log(this, a + b);
        }
        fn.call(o, 1, 3)

        function Father(uname, age, sex) {
            this.uname = uname
            this.age = age
            this.sex = sex
        }
        function Son (uname,age,sex){
            Father.call(this,uname,age,sex)
        }
        var  son =new Son('1','2','3')
        console.log(son);

```

**apply**

```stylus
 var o = {
            name: "andy"
        };
        function fn(arr) {
            console.log(this);
            console.log(arr);
        }
        fn.apply(o, ['pink'])
        // 1.也是调用函数，第二个可以改变函数内部的this指向
        // 2.但是他的参数必须是数组（伪数组）
        // 3. apply 的主要应用是可以利用apply借助于数学 内置对象求最大值 Math.max()

        var arr = [1, 88, 22, 43]
        // var max = Math.max.apply(null, arr);
        var max = Math.max.apply(Math, arr);
        var min = Math.min.apply(Math, arr);
        console.log(max,min);
```

**bind**

```stylus
        // 3.bind() 不会的调用函数，但是能改变函数内部的this指向


        // 不会调用原来的函数 可以改变原来函数内部的this，指向
        // 返回的是原函数改变this之后产生的新函数
        var o = {
            name: "andys"
        };
        function fn() {
            console.log(this);
        }
        var f = fn.bind(o);
        f()
```
