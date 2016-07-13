

//所声明的变量，只在`let`命令所在的代码块内有效
{
  let a = 10;
  var b = 1;
}

console.log(a);
console.log(b);

a // ReferenceError: a is not defined.
b // 1



//变量提升至全局
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10

//块内使用
var aa = [];
for (let i = 0; i < 10; i++) {
  aa[i] = function () {
    console.log(i);
  };
}
aa[6](); // 6





//内层变量覆盖外层变量
var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = "hello world";   //let
  }
}

f(); // undefined



//循环中使用let命令
for (let i = 0; i < arr.length; i++) {}

console.log(i);



//const 变量
const PI = 3.1415;
console.log(PI) // 3.1415

PI = 3;



var a = 1;
console.log(window.a);

let b = 1;
console.log(window.b);
