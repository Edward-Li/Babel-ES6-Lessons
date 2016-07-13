

//解构赋值

//var a = 1;
//var b = 2;
//var c = 3;

var [a, b, c] = [1, 2, 3];

console.log(a);
console.log(b);
console.log(c);

let [x, , y] = [1, 2, 3];

console.log(x);
console.log(y);


let [foo, [[bar, bax], baz]] = [1, [[2, 22], 3]];
console.log(foo); // 1
console.log(bar); // 2
console.log(bax); // 22
console.log(baz); // 3


//解构不成功
var [foo] = [];
var [bar, foo] = [1];
console.log(foo);
console.log(foo);

//不完全解构
let [a, [b], d] = [1, [2, 3], 4];
console.log(a); // 1
console.log(b); // 2
console.log(d); // 4


//解构赋值允许指定默认值
[x, y = 'b'] = ['a']; // x='a', y='b'
[x, y = 'b'] = ['a', undefined]; // x='a', y='b'



//表达式是惰性求值
function f() {
  console.log('aaa');
}

let [x = f()] = [1];
let [x = f()] = []




//解构赋值不仅适用于var命令，也适用于let和const命令
var [v1, v2, ..., vN] = array;
let [v1, v2, ..., vN] = array;
const [v1, v2, ..., vN] = array;



//右边不是数组，那么将会报错; 
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};


//只要某种数据结构具有Iterator接口，都可以采用数组形式的解构赋值

//解构不仅可以用于数组，还可以用于对象
var { bar, foo } = { foo: "aaa", bar: "bbb" };
console.log(foo); // "aaa"
console.log(bar); // "bbb"

//对象的解构也可以指定默认值
var {x = 3} = {};
console.log(x); // 3

var {x, y = 5} = {x: 1};
console.log(x); // 1
console.log(y); // 5

var { message: msg = "Something went wrong" } = {};
msg // "Something went wrong"

//实际赋给右侧参数
var { baz } = { foo: "aaa", bar: "bbb" };
console.log(baz); // undefined

var { foo: x } = { foo: "aaa", bar: "bbb" };
console.log(x); // 


//解构也可以用于嵌套结构的对象
var obj = {
  p: [
    "Hello",
    { y: "World" }
  ]
};

var { p: [x, { y }]} = obj;
console.log(x); // "Hello"
console.log(y); // "World"


//只有`line`是变量，`loc`和`start`都是模式，不会被赋值
var node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};

var { loc: { start: { line }} } = node;
console.log(line); // 1
console.log(loc);  // error: loc is undefined
console.log(start); // error: start is undefined


// Generator
function* fibs() {
  var a = 0;
  var b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

var [first, second, third, fourth, fifth, sixth] = fibs();
console.log(sixth); // 5








//字符串的解构赋值
const [a, b, c, d, e] = 'hello';
console.log(a); // "h"
console.log(b); // "e"
console.log(c); // "l"
console.log(d); // "l"
console.log(e); // "o"


//数值和布尔值的解构赋值
let {toString: s} = 123;
console.log(s);
console.log(s === Number.prototype.toString); // true

let {toString: s} = true;
console.log(s);
console.log(s === Boolean.prototype.toString); // true



//函数参数的解构赋值
function add([x, y]) {
  return x + y;
}

console.log(add([1, 2])); // 3


//函数参数的解构也可以使用默认值
function move({x = 0, y = 0} = {}) {
  return [x, y];
}

console.log(move({ x: 3, y: 8 })); // [3, 8]
console.log(move({ x: 3 })); // [3, 0]
console.log(move({})); // [0, 0]
console.log(move()); // [0, 0]


//用途
//交换变量的值
let x = 1;
let y = 2;
[x, y] = [y, x];
console.log(x);
console.log(y);

//从函数返回多个值   C# tuple  实际是对返回对象的直接解构
function example() {
  return {
    foo: 1,
    bar: 2
  };
}
var { foo, bar } = example();
console.log(foo);
console.log(bar);


//提取JSON数据
var jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]


//函数参数的默认值
//参照上文


//遍历Map结构 
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world

// 获取键名 获取键值
for (let [key] of map) {
  console.log(key);
}

// 获取键值
for (let [, value] of map) {
  console.log(value);
}



