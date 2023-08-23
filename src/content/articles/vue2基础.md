---
title: vue2基础知识复习巩固
date: 2021-03-18
tags:
- vue2
- 框架
---
# 认识Vue

1.想让Vue工作，就必须创建一个Vue实例，且要传入一个配置对象；

2.root容器里的代码依然符合html规范，只不过混入了一些特殊的Vue语法；

3.root容器里的代码被称为【Vue模板】；

4.Vue实例和容器是一一对应的；

5.真实开发中只有一个Vue实例，并且会配合着组件一起使用；

6.{{xxx}}中的xxx要写js表达式，且xxx可以自动读取到data中的所有属性；

7.一旦data中的数据发生改变，那么页面中用到该数据的地方也会自动更新；

**注意区分:**

   1.表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方：

(1). a

(2). a+b

(3). demo(1)

 (4). x === y ? 'a' : 'b'

2.js代码(语句)

   (1). if(){}

   (2). for(){}

**示例**

```js
	<div id="demo">
		<h1>Hello，{{name.toUpperCase()}}，{{address}}</h1>
	</div>

	<script type="text/javascript">
		Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

		//创建Vue实例
		new Vue({
			el: '#demo', //el用于指定当前Vue实例为哪个容器服务，值通常为css选择器字符串。
			data: { //data中用于存储数据，数据供el所指定的容器去使用，值我们暂时先写成一个对象。
				name: 'atguigu',
				address: '北京'
			}
		})

	</script>
```

# 模板语法

vue模板语法分为两大类，一种是插值语法，另外一种是指令语法。

1. **插值语法**
   功能：用于解析标签体的内容
   写法：{{aaa}},aaa是js表达式，且可以读取到data中的所有属性
2. **指令语法**

   功能：用于解析标签（包括：标签属性、标签体内容、绑定事件.....）。

   举例：v-bind:href="xxx" 或  简写为 :href="xxx"，xxx同样要写js表达式，且可以直接读取到data中的所 有属性。

   备注：Vue中有很多的指令，且形式都是：v-????，此处我们只是拿v-bind举个例子。

**代码示例**

```js
	<div id="root">
		<h1>插值语法</h1>
		<h3>你好，{{name}}</h3>
		<hr />
		<h1>指令语法</h1>
		<a v-bind:href="school.url.toUpperCase()" x="hello">点我去{{school.name}}学习1</a>
		<a :href="school.url" x="hello">点我去{{school.name}}学习2</a>
	</div>

	<script type="text/javascript">
		Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

		new Vue({
			el: '#root',
			data: {
				name: 'jack',
				school: {
					name: '尚硅谷',
					url: 'http://www.atguigu.com',
				}
			}
		})
	</script>
```

# 数据绑定

在vue中也有两种数据绑定的方式：

1. 单向绑定(v-bind)：数据只能从data流向页面。
2. 双向绑定(v-model)：数据不仅能从data流向页面，还可以从页面流向data。

**备注**：双向绑定一般都应用在表单类元素上（如：input、select等）；v-model:value 可以简写为 v-model，因为v-model默认收集的就是value值。

**代码示例**

```js
<body>
		<!-- 
			Vue中有2种数据绑定的方式：
					1.单向绑定(v-bind)：数据只能从data流向页面。
					2.双向绑定(v-model)：数据不仅能从data流向页面，还可以从页面流向data。
						备注：
								1.双向绑定一般都应用在表单类元素上（如：input、select等）
								2.v-model:value 可以简写为 v-model，因为v-model默认收集的就是value值。
		 -->
		<!-- 准备好一个容器-->
		<div id="root">
			<!-- 普通写法 -->
			<!-- 单向数据绑定：<input type="text" v-bind:value="name"><br/>
			双向数据绑定：<input type="text" v-model:value="name"><br/> -->

			<!-- 简写 -->
			单向数据绑定：<input type="text" :value="name"><br/>
			双向数据绑定：<input type="text" v-model="name"><br/>

			<!-- 如下代码是错误的，因为v-model只能应用在表单类元素（输入类元素）上 -->
			<!-- <h2 v-model:x="name">你好啊</h2> -->
		</div>
	</body>

	<script type="text/javascript">
		Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

		new Vue({
			el:'#root',
			data:{
				name:'尚硅谷'
			}
		})
	</script>
```

# el与data的两种写法

1. el的两种写法

* new Vue时候配置el属性。
* 先创建Vue实例，随后再通过vm.$mount('#root')指定el的值。

2. data的两种写法

一种是函数式，一种是对象式，但是在组件中使用的时候必须使用函数式，这样才能避免组件之间的data相互污染

**提示：**

由vue管理的函数，一定不要写成箭头函数，因为箭头函数没有this实例，因此写了箭头函数之后，this指向的就是不再是vue实例。

**代码示例**

```js
	<div id="root">
		<h1>你好，{{name}}</h1>
	</div>
	<script type="text/javascript">
		Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

		//el的两种写法
		/* const v = new Vue({
			//el:'#root', //第一种写法
			data:{
				name:'尚硅谷'
			}
		})
		console.log(v)
		v.$mount('#root') //第二种写法 */

		//data的两种写法
		new Vue({
			el: '#root',
			//data的第一种写法：对象式
			/* data:{
				name:'尚硅谷'
			} */

			//data的第二种写法：函数式
			data() {
				console.log('@@@', this) //此处的this是Vue实例对象
				return {
					name: '尚硅谷'
				}
			}
		})
	</script>
```

# 理解MVVM模型

含义：MVVM是由M：模型(Model) ：data中的数据，可以是自己写的，也有可能是从后端请求的；V：视图(View) ：模板代码，就是html+css+js；VM：视图模型(ViewModel)：Vue实例这三者组成。

要实现MVVM模式，那就要页面操作的时候，然后改变数据；或者是数据改变的时候，页面改变。

V 变→ M 变 那就要DOM 监听，DOM监听才知道视图操作可能引起数据变了，若数据变了才会改变data中的数据。M变 → V变 那就要数据绑定，data数据变了，那就通过数据的绑定改变视图。所以MVVM模式是通过DOM监听 + 数据绑定 完成的

发现：data中所有的属性，最后都出现在了vm身上；vm身上所有的属性 及 Vue原型上所有属性，在Vue模板中都可以直接使用。

![1675147738703](image/vue2基础/1675147738703.png)

**代码示例**

```js
	<div id="root">
		<h1>学校名称：{{name}}</h1>
		<h1>学校地址：{{address}}</h1>
		<!-- <h1>测试一下1：{{1+1}}</h1>
			<h1>测试一下2：{{$options}}</h1>
			<h1>测试一下3：{{$emit}}</h1>
			<h1>测试一下4：{{_c}}</h1> -->
	</div>
	<script type="text/javascript">
		Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

		const vm = new Vue({
			el: '#root',
			data: {
				name: '尚硅谷',
				address: '北京',
			}
		})
		console.log(vm)
	</script>
```

# 数据代理

## 回顾Object.defineproperty方法

作用：该方法的作用就是对一个对象定义新的属性，或者修改已经存在的属性。

  Object.defineproperty方法需要传递3个参数

    Object.defineproperty（obj, prop, desc  ）

    参数1：obj     需要定义属性的当前对象

    参数2：prop    当前需要定义的属性名

    参数3：desc    描述符 一般是一个对象

**代码示例**

```js
		<script type="text/javascript" >
			let number = 18
			let person = {
				name:'张三',
				sex:'男',
			}

			Object.defineProperty(person,'age',{
				// value:18,
				// enumerable:true, //控制属性是否可以枚举，默认值是false
				// writable:true, //控制属性是否可以被修改，默认值是false
				// configurable:true //控制属性是否可以被删除，默认值是false

				//当有人读取person的age属性时，get函数(getter)就会被调用，且返回值就是age的值
				get(){
					console.log('有人读取age属性了')
					return number
				},

				//当有人修改person的age属性时，set函数(setter)就会被调用，且会收到修改的具体值
				set(value){
					console.log('有人修改了age属性，且值是',value)
					number = value
				}

			})

			// console.log(Object.keys(person))

			console.log(person)
		</script>
```

注意：当我们使用了getter或者setter方法的时候，就不能使用value 和 writable属性，否则就会报错。

get 是获取值的时候触发的方法， set 是修改值的时候出发的方法，两个方法不是必须成对出现。

## 什么是数据代理

含义：通过对一个对象代理对另一个对象中属性的操作（读写操作，这就是数据代理

## 简单实现数据代理

JS有一个内置对象Object数据代理的方法为： =Object.defineProperty(obj, prop, descriptor)= ，通过这个方法即可实现数据代理。

参数解析：
obj----------------------------------->要定义属性的对象
prop--------------------------------->要定义或修改的属性的名称或 Symbol
descriptor-------------------------->要定义或修改的属性描述符

**举例**

```js
    let obj1 = {x:100};
    let obj2 = {y:200};

    Object.defineProperty(obj2, 'x', {
         // 当读取obj2的x属性时，get函数（getter）就会被调用，且返回值就是x的值
        get() {
            console.log('拿obj1的x了');
            return obj1.x
        },
         // 当修改obj2的x属性时，set函数（setter）就会被调用，且会收到一个具体修改的值value
        set(value) {
            console.log('给obj1的x赋值');
            obj1.x = value
        }
    })

```

扩展：在descriptor参数中，除了 **getter** 、 **setter** （最常用的两个）之外，还有其他配置项，例：

```js
	let person = {
	        name: 'xxc',
	        age: 22
	    };

    Object.defineProperty(person, 'age', {
        value: 18,
        enumerable: true, // 控制属性是否可以枚举，默认为false
        writable: true, // 控制属性是否可以被修改，默认为false
        configurable: true, // 控制属性是否可以被删除，默认为false
    })

```

注：通过代理的方式修改person中age属性与直接修改person中age属性的区别也很明显，代理的方式属性默认都是不可修改或枚举的，需要手动开启配置项设置。

但是我们用数据代理一般只会用到getter和setter，比如在vue中data里的属性就是用到数据代理来方便程序员写代码。

## vue中的数据代理

**代码示例**

```js
		<div id="root">
			<h2>学校名称：{{name}}</h2>
			<h2>学校地址：{{address}}</h2>
		</div>
		<script type="text/javascript">
			Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

			const vm = new Vue({
				el:'#root',
				data:{
					name:'张三',
					address:'成都'
				}
			})
			console.log(vm);
		</script>
```

通过打印上面的vm实例，可以发现但是一开始的状态是…(三个点)，这三个点其实就表示的是该数据是通过Object.defineProperty()来创建的；当然在下面也可以看到name和address这两个数据的getter和setter。

那么vue 是如何实现getter和setter的呢？

在data中定义的name 和 address的时候，vue 实例 对象在其自身添加了一个_data属性，就是用来存储data中定义的name和address。

但是这个时候页面只能通过_data.name的形式才可以访问。但是我们需要直接访问vue实例对象中的name和address，因此，vue 会在当前的vue 实例对象上开始加东西，会将data中定义的数据都加到vue 实例对象中，首先会添加一个name 属性，**name的值则是通过getter来读取_data中name的值** ； **如果修改vue实例对象中name的值，则通过setter映射到_data中的name来进行修改** ；

# 事件处理

## 事件的基本使用

基本使用：

1.使用v-on:xxx 或 @xxx 绑定事件，其中xxx是事件名；

2.事件的回调需要配置在methods对象中，最终会在vm上；

3.methods中配置的函数，不要用箭头函数！否则this就不是vm了；

4.methods中配置的函数，都是被Vue所管理的函数，this的指向是vm 或 组件实例对象；

5.@click="demo" 和 @click="demo($event)" 效果一致，但后者可以传参；

```js
	<div id="root">
		<h2>欢迎来到{{name}}学习</h2>
		<!-- <button v-on:click="showInfo">点我提示信息</button> -->
		<button @click="showInfo1">点我提示信息1（不传参）</button>
		<button @click="showInfo2($event,66)">点我提示信息2（传参）</button>
	</div>
	<script type="text/javascript">
		Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

		const vm = new Vue({
			el: '#root',
			data: {
				name: '尚硅谷',
			},
			methods: {
				showInfo1(event) {
					// console.log(event.target.innerText)
					// console.log(this) //此处的this是vm
					alert('同学你好！')
				},
				showInfo2(event, number) {
					console.log(event, number)
					// console.log(event.target.innerText)
					// console.log(this) //此处的this是vm
					alert('同学你好！！')
				}
			}
		})
	</script>
```

## 事件修饰符

包括如下：

 1.prevent：阻止默认事件（常用）；

 2.stop：阻止事件冒泡（常用）；

 3.once：事件只触发一次（常用）；

 4.capture：使用事件的捕获模式；

 5.self：只有event.target是当前操作的元素时才触发事件；

 6.passive：事件的默认行为立即执行，无需等待事件回调执行完毕

# 计算属性computed

* 定义：要用的属性不存在，要通过已有属性**计算**得来。
* 原理：底层借助了 `Objcet.defineproperty`方法提供的 `getter`和 `setter`。
* get函数什么时候执行？

  1. 初次读取时会执行一次。
  2. 当依赖的数据发生改变时会被再次调用。
* 优势：与methods实现相比，内部有**缓存**机制（复用），效率更高，调试方便。
* 备注：

  1. 计算属性最终会出现在vm上，直接读取使用即可。
  2. 如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生改变。

**代码示例**

```js
	<!-- 准备好一个容器-->
	<div id="root">
		姓：<input type="text" v-model="firstName"> <br /><br />
		名：<input type="text" v-model="lastName"> <br /><br />
		测试：<input type="text" v-model="x"> <br /><br />
		全名：<span>{{fullName}}</span> <br /><br />
		<!-- 全名：<span>{{fullName}}</span> <br/><br/>
			全名：<span>{{fullName}}</span> <br/><br/>
			全名：<span>{{fullName}}</span> -->
	</div>

	<script type="text/javascript">
		Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

		const vm = new Vue({
			el: '#root',
			data: {
				firstName: '张',
				lastName: '三',
				x: '你好'
			},
			methods: {
				demo() {

				}
			},
			computed: {
				fullName: {
					//get有什么作用？当有人读取fullName时，get就会被调用，且返回值就作为fullName的值
					//get什么时候调用？1.初次读取fullName时。2.所依赖的数据发生变化时。
					get() {
						console.log('get被调用了')
						// console.log(this) //此处的this是vm
						return this.firstName + '-' + this.lastName
					},
					//set什么时候调用? 当fullName被修改时。
					set(value) {
						console.log('set', value)
						const arr = value.split('-')
						this.firstName = arr[0]
						this.lastName = arr[1]
					}
				}
			}
		})
	</script>
```

**简写形式**

```js
				//简写
				fullName(){
					console.log('get被调用了')
					return this.firstName + '-' + this.lastName
				}
```

# 监视属性watch

定义：通过vm对象的$watch()或者watch配置来指定监视的属性，当属性发生变化时，回调函数自动调用，在函数内部进行计算

1.在new Vue时传入watch配置

```js
watch:{
    isHot:{
        immediate:true, //初始化时让handler调用一下
        //handler什么时候调用？当isHot发生改变时。
        handler(newValue,oldValue){
            console.log('isHot被修改了',newValue,oldValue)
        }
    }
}
```

2.通过vm.$watch监视

```js
vm.$watch('isHot',{
    immediate:true, //初始化时让handler调用一下
    //handler什么时候调用？当isHot发生改变时。
    handler(newValue,oldValue){
        console.log('isHot被修改了',newValue,oldValue)
    }
})
```

深度监视：

 Vue中的watch默认不监测对象内部值的改变（一层）。配置deep:true可以监测对象内部值改变（多层）。

备注：Vue自身可以监测对象内部值的改变，但Vue提供的watch默认不可以！使用watch时根据数据的具体结构，决定是否采用深度监视。

# mixin混入

含义：Vue的混合可以对钩子函数的复用，data中的数据如果组件本身就有的，以组件自己的为准，但是组件本身有的方法和混合里面的方法都会有。并且可以在main.js进行全局混合。

功能：可以把多个组件共用的配置提取成一个混入对象

使用方式：

第一步定义混合

第二步使用混入：

    全局混入：``Vue.mixin(xxx)``，在main.js使用
    局部混入：``mixins:['xxx']	``在组件中使用

# 总结TodoList案例

* 组件化编码流程：
  (1).拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突。
  (2).实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：
  1).一个组件在用：放在组件自身即可。
  2). 一些组件在用：放在他们共同的父组件上（`<span style="color:red">`状态提升）。
  (3).实现交互：从绑定事件开始。
* props适用于：
  (1).父组件 ==> 子组件 通信
  (2).子组件 ==> 父组件 通信（要求父先给子一个函数）
* 使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的！
* props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做。
