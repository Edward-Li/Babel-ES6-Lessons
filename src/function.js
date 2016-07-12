
//参数指定默认值
//在ES6之前，不能直接为函数的参数指定默认值，只能采用变通的方法
//ES5
function log(x, y) {
  y = y || 'World';
  console.log(x, y);
}
//ES6
function log(x, y = 'World') {
  console.log(x, y);
}

//Point function
function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}

var p = new Point();
console.log(p);
var q = new Point(1,2);
console.log(q);


//与解构赋值默认值结合使用
function foo({x, y = 5}) {
  console.log(x, y);
}

foo({}) // undefined, 5
foo({x: 1}) // 1, 5
foo({x: 1, y: 2}) // 1, 2
foo() // TypeError: Cannot read property 'x' of undefined


//参数默认值的位置
//定义了默认值的参数，应该是函数的尾参数。
function Point(x = 0, y) {
  this.x = x;
  this.y = y;
}
var p = new Point();

//函数的length属性
//返回没有指定默认值的参数个数
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2





//rest参数   
//ES6引入rest参数（形式为“...变量名”），用于获取函数的多余参数
//rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中

//ES5
function argTest(){
    for(let a in arguments)
      console.log(a);

    console.log(arguments.length);
}

argTest();  //0
argTest(1,2,3); // 3

//ES6
function add(...values) {
  let sum = 0;
  for (var val of values) {
    sum += val;
  }
  return sum;
}

console.log(add(2, 5, 3, 12, 2)); 

//rest参数之后不能再有其他参数（即只能是最后一个参数），否则会报错
// 报错
function f(a, ...b, c) {
  // ...
}


//扩展运算符  ...
//rest参数的逆运算，将一个数组转为用逗号分隔的参数序列

console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

//用于函数调用
function add(x, y) {
  return x + y;
}

var numbers = [4, 38];
add(...numbers) // 42

function f(v, w, x, y, z) { }
var args = [0, 1];
f(-1, ...args, 2, ...[3]);


//替代数组的apply方法
// ES5的写法
Math.max.apply(null, [14, 3, 77])

// ES6的写法
Math.max(...[14, 3, 77])

// 等同于
Math.max(14, 3, 77);

// 将一个数组添加到另一个数组的尾部
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);

// ES6的写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1.push(...arr2);













// name  属性，返回该函数的函数名
var func1 = function () {};
console.log(func1.name);

(new Function).name // "anonymous"



// 箭头函数  
//ES6允许使用“箭头”（`=>`）定义函数
var f = v => v + v;

var f = function(v) {
  return v + v;
};

console.log(f("123"));


var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};

//如果箭头函数直接返回一个对象，必须在对象外面加上括号
var getTempItem = id => ({ id: id, name: "Temp" });


//箭头函数可以与变量解构结合使用
const full = ({ first, last }) => first + ' ' + last;

var p = {
    first: "Edward",
    last: "Li"
}

console.log(full(p));

const isEven = n => n % 2 == 0;
const square = n => n * n;

//简化回调函数
[1,2,3].map(function (x) {
  return x * x;
});

[1,2,3].map(x => x * x);


//（1）函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。

//（2）不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。

//（3）不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。

//（4）不可以使用`yield`命令，因此箭头函数不能用作Generator函数。

//this 
function foo() {
  setTimeout(function() {
    console.log('id:', this.id);
  }, 100);
}

function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

var id = 21;

foo.call({ id: 42 });
// id: 42


function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  // 箭头函数
  setInterval(() => this.s1++, 1000);
  // 普通函数
  setInterval(function () {
    this.s2++;
  }, 1000);
}

var timer = new Timer();

setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);
// s1: 3
// s2: 0


//嵌套的箭头函数

function insert(value) {
  return {into: function (array) {
    return {after: function (afterValue) {
      array.splice(array.indexOf(afterValue) + 1, 0, value);
      return array;
    }};
  }};
}

insert(2).into([1, 3]).after(1); //[1, 2, 3]


let insert = (value) => ({into: (array) => ({after: (afterValue) => {
  array.splice(array.indexOf(afterValue) + 1, 0, value);
  return array;
}})});

insert(2).into([1, 3]).after(1); //[1, 2, 3]




//函数邦定
function Obj(){
    this.value = "Obj value";
}

var n = { value: "n value" };

function Fun1() {
    console.log(this.value);
}

Fun1.call(new Obj()); //value
Fun1.call(n); //value

->
n::Fun1;


//尾递归
function Fibonacci (n) {
  if ( n <= 1 ) {return 1};

  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

Fibonacci(10); // 89

//优化后
function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
  if( n <= 1 ) {return ac1};

  return Fibonacci2 (n-1 , ac2 , ac1 + ac2);
}

Fibonacci2(100) // 354224848179262000000
