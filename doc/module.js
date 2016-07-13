//在ES6之前，社区制定了一些模块加载方案，最主要的有CommonJS和AMD两种。前者用于服务器，后者用于浏览器。
//ES6在语言规格的层面上，实现了模块功能，而且实现得相当简单，完全可以取代现有的CommonJS和AMD规范，成为浏览器和服务器通用的模块解决方案。
//CommonJs   加载模块使用require方法，该方法读取一个文件并执行
//AMD((Asynchromous Module Definition)  适用define方法定义模块 define(['someModule1', ‘someModule2’], function (someModule1, someModule2) { }

//严格模式
//ES6的模块自动采用严格模式，不管你有没有在模块头部加上`"use strict";`

//- 变量必须声明后再使用
//- 函数的参数不能有同名属性，否则报错
//- 不能使用`with`语句
//- 不能对只读属性赋值，否则报错
//- 不能使用前缀0表示八进制数，否则报错
//- 不能删除不可删除的属性，否则报错
//- 不能删除变量`delete prop`，会报错，只能删除属性`delete global[prop]`
//- `eval`不会在它的外层作用域引入变量
//- `eval`和`arguments`不能被重新赋值
//- `arguments`不会自动反映函数参数的变化
//- 不能使用`arguments.callee`
//- 不能使用`arguments.caller`
//- 禁止`this`指向全局对象
//- 不能使用`fn.caller`和`fn.arguments`获取函数调用的堆栈
//- 增加了保留字（比如`protected`、`static`和`interface`）


//export命令
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;

// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {firstName, lastName, year};

//输出函数或class
export function multiply(x, y) {
    return x * y;
};

export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static classMethod() {
        return 'hello';
    }

    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}

//可以使用`as`关键字重命名
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};

//命令可以出现在模块的任何位置，只要处于模块顶层就可以。不能处于块级作用域内






// import命令
//`import`命令接受一个对象（用大括号表示），里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块对外接口的名称相同。

import {firstName, lastName, year, multiply, Point} from './module/profile';

function setName(element) {
    element.textContent = firstName + ' ' + lastName;
}

var a = {};
setName(a);
console.log(a.textContent);

console.log(multiply(3, 9));

console.log(Point.classMethod());

var obj = new Point(2, 9);
console.log(obj.toString());

//可以使用`as`关键字重命名
import { lastName as surname } from './module/profile';






//模块的整体加载
//export circle.js

import { area, circumference } from './module/circle';

console.log('circle area: ' + area(4));
console.log('circle length:' + circumference(14));

//module
import * as circle from './circle';

console.log('circle area:' + circle.area(4));
console.log('circle length:' + circle.circumference(14));






//export default命令  需要注意的是，这时`import`命令后面，不使用大括号。
// export-default.js
export default function () {
  console.log('foo');
}

// import-default.js
import customName from './module/export-default';
customName(); // 'foo'




//模块的继承
//`export *`，表示再输出`circle`模块的所有属性和方法。
//注意，`export *`命令会忽略`circle`模块的`default`方法。然后，上面代码又输出了自定义的`e`变量和默认方法

// circleplus.js
export * from './circle';   // export { area as circleArea } from 'circle';
export var e = 2.71828182846;
export default function(x) {
  return Math.exp(x);
}


//main.js
import * as math from './module/circleplus';
import exp from './module/circleplus';
console.log(exp(math.e));







//ES6模块加载的实质

//CommonJS模块输出的是被输出值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。请看下面这个模块文件`lib.js`的例子。
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};

// main.js
var mod = require('./module/lib');

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3



//ES6模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块
// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}

// main.js
import { counter, incCounter } from './module/lib';

console.log(counter); // 3
incCounter();
console.log(counter); // 4