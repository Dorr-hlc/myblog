---
title: Promise详解
date: 2023-01-22
tags:
- JavaScript
---
## 概述

Promise是[异步编程](https://so.csdn.net/so/search?q=%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B&spm=1001.2101.3001.7020)的一种解决方案，可以替代传统的解决方案--回调函数和事件。ES6统一了用法，并原生提供了Promise对象。作为对象，Promise有以下两个特点：

(1)对象的状态不受外界影响。

(2)一旦状态改变了就不会再变，也就是说任何时候Promise都只有一种状态。

## 状态

Promise 有3种状态，分别是pending(进行中)，resolve(成功)，reject(失败)。最开始都是从Pending状态开始，成功就会转换成resolve成功状态，失败就会转换成为reject失败状态。

## 基本用法

可以通过Promise的构造函数创建Promise对象,Promise构造函数接受一个函数作为参数，该函数的两个参数是 resolve ，reject，它们由JavaScript引擎提供。其中 resolve 函数的作用是当Promise对象转移到成功，调用resolve并将操作结果作为其参数传递出去；reject 函数的作用是当Promise对象的状态变为失败时，将操作报出的错误作为参数传递出去。如如下代码：

```js
function test() {
  const promise = new Promise((resolve, reject) => {
    var txt = "hello";
    resolve(txt);
  });
  return promise;
}

var dd = test().then((v) => {
  console.log(v);
});
console.log(dd);

```

**注意：** 创建一个Promise对象会立即执行里面的代码，所以为了更好的控制代码的运行时刻，可以将其包含在一个函数中，并将这个Promise作为函数的返回值。

## then 方法

promise的then方法带有一下三个参数：成功的回调，失败的回调，前进的回调。一般情况下只需要实现第一个，后面的是可选的。Promise中最为重要的状态，通过then的状态传递可以实现的回调函数链式操作的实现。先执行以下代码：

```js
function greet () {
  var promise = new Promise (function(resolve, reject){
    var greet = "hello world"
    resolve(greet)
  })
  return promise
}
var p = greet().then(v => {
  console.log(v)  // hello world
})
console.log(p)  // Promise { <pending> }
```

从中可以看出promise执行then还是一个promise，并且Promise的执行是异步的。因为 hello world 在最后一条输出语句的前面就打印出来了，且Promise的状态为pending(进行中)。

因为Promise执行then后还是Promise，所以就可以根据这一特性，不断的链式调用回调函数。下面是一个例子：

```js
function greet () {
  var promise = new Promise(function (resolve, reject){
    var greeet = "hello world"
    resolve(greet)
  })
  return promise
}
greet().then(v => {
  console.log(v+1)
  return v
})
.then (v => {
  console.log(v+2)
  return v
})
.then (v => {
  console.log(v+3)
})
```

## reject方法

reject的作用就是把Promise的状态从pending置为rejected，这样在then中就能捕捉到reject的回调函数。

```js
function judgeNumber (num) {
  var promise = new Promise (function(resolve, reject) {
    num = 5
    if(num < 5){
      resolve("num小于5，值为" + num)
    } else {
      reject("num不小于5，值为" + num)
    }
  })
  return promise
}
 
judgeNumber().then(
  function (message) {
    console.log(message)
  },
  funtion (message) {
    console.log(message)
  }
)
```

### catch用法

```js
function judgeNumber(num){
    var promise1 = new Promise(function(resolve,reject){
        num =5;
        if(num<5){
            resolve("num小于5，值为："+num);
        }else{
            reject("num不小于5，值为："+num);
        }
    });
    return promise1;
}
 
judgeNumber().then(
    function(message){
        console.log(message);
    }
)
.catch(function(message){
    console.log(message);
})
```

这个时候catch执行的是和reject一样的，也就是说如果Promise的状态变为reject时，会被catch捕捉到，不过需要特别注意的是如果前面设置了reject方法的回调函数，·则catch不会捕捉到状态变为reject的情况。catch还有一点不同的是，如果在resolve或者reject发生错误的时候，会被catch捕捉到，这与java，c++的错误处理时一样的，这样就能避免程序卡死在回调函数中了。


### all用法

Promise的all方法提供了并行执行异步操作的能力，在all中所有异步操作结束后才执行回调。

```js
function p1(){
    var promise1 = new Promise(function(resolve,reject){
        console.log("p1的第一条输出语句");
        console.log("p1的第二条输出语句");
        resolve("p1完成");
    })
    return promise1;
}
 
function p2(){
    var promise2 = new Promise(function(resolve,reject){
        console.log("p2的第一条输出语句");
        setTimeout(()=>{console.log("p2的第二条输出语句");resolve("p2完成")},2000);
 
    })
    return promise2;
}
 
function p3(){
    var promise3 = new Promise(function(resolve,reject){
        console.log("p3的第一条输出语句");
        console.log("p3的第二条输出语句");
        resolve("p3完成")
    });
    return  promise3;
}
 
Promise.all([p1(),p2(),p3()]).then(function(data){
    console.log(data);
})
```


### race用法

在all中的回调函数中，等到所有的Promise都执行完，再来执行回调函数，race则不同它等到第一个Promise改变状态就开始执行回调函数。将上面的 `all`改为 `race`,得到

```js
Promise.race([p1(),p2(),p3()]).then(function(data){
    console.log(data);
})
```
