
//Number.isFinite(), Number.isNaN()  ES6在Number对象上，新提供了`Number.isFinite()`和`Number.isNaN()`两个方法,传统的全局方法`isFinite()`和`isNaN()`
Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite('foo'); // false
Number.isFinite('15'); // false
Number.isFinite(true); // false


Number.isNaN(NaN) // true
Number.isNaN(15) // false
Number.isNaN('15') // false
Number.isNaN(true) // false
Number.isNaN(9/NaN) // true
Number.isNaN('true'/0) // true
Number.isNaN('true'/'true') // true

//Number.parseInt(), Number.parseFloat()     ES6将全局方法`parseInt()`和`parseFloat()`，移植到Number对象上面，行为完全保持不变
// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45

// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45


//Number.isInteger()
Number.isInteger(25) // true
Number.isInteger(25.0) // true
Number.isInteger(25.1) // false
Number.isInteger("15") // false
Number.isInteger(true) // false


//Number.EPSILON



//安全整数和Number.isSafeInteger()
Math.pow(2, 53) // 9007199254740992

console.log(Math.pow(2, 53));  // 9007199254740992
console.log(Math.pow(-2, 53));  // 9007199254740992

console.log(Math.pow(2, 53) === Math.pow(2, 53) + 1)
// true
//ES6引入了`Number.MAX_SAFE_INTEGER`和`Number.MIN_SAFE_INTEGER`这两个常量，用来表示这个范围的上下限
Number.MAX_SAFE_INTEGER
Number.MIN_SAFE_INTEGER

//Math对象的扩展
//Math.trunc()
Math.trunc(4.1) // 4
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(-4.9) // -4
Math.trunc(-0.1234) // -0

//Math.sign()
Math.sign(-5) // -1
Math.sign(5) // +1
Math.sign(0) // +0
Math.sign(-0) // -0
Math.sign(NaN) // NaN
Math.sign('foo'); // NaN
Math.sign();      // NaN

//Math.cbrt()  计算一个数的立方根
Math.cbrt(-1) // -1
Math.cbrt(0)  // 0
Math.cbrt(1)  // 1
Math.cbrt(2)  // 1.2599210498948734


//Math.clz32()     返回一个数的32位无符号整数形式有多少个前导0
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1000) // 22
Math.clz32(0b01000000000000000000000000000000) // 1
Math.clz32(0b00100000000000000000000000000000) // 2


//Math.imul()  返回两个数以32位带符号整数形式相乘的结果，返回的也是一个32位的带符号整数
Math.imul(2, 4)   // 8
Math.imul(-1, 8)  // -8
Math.imul(-2, -2) // 4


//Math.fround()   返回一个数的单精度浮点数形式
Math.fround(0)     // 0
Math.fround(1)     // 1
Math.fround(1.337) // 1.3370000123977661
Math.fround(1.5)   // 1.5
Math.fround(NaN)   // NaN


//Math.hypot()  返回所有参数的平方和的平方根
Math.hypot(3, 4);        // 5
Math.hypot(3, 4, 5);     // 7.0710678118654755
Math.hypot();            // 0
Math.hypot(NaN);         // NaN
Math.hypot(3, 4, 'foo'); // NaN
Math.hypot(3, 4, '5');   // 7.0710678118654755
Math.hypot(-3);          // 3


//对数方法
//Math.expm1()  
//Math.log1p()
//Math.log10()
//Math.log2()


//三角函数方法  ES6新增了6个三角函数方法
//- `Math.sinh(x)` 返回`x`的双曲正弦（hyperbolic sine）
//- `Math.cosh(x)` 返回`x`的双曲余弦（hyperbolic cosine）
//- `Math.tanh(x)` 返回`x`的双曲正切（hyperbolic tangent）
//- `Math.asinh(x)` 返回`x`的反双曲正弦（inverse hyperbolic sine）
//- `Math.acosh(x)` 返回`x`的反双曲余弦（inverse hyperbolic cosine）
//- `Math.atanh(x)` 返回`x`的反双曲正切（inverse hyperbolic tangent）


//指数运算符
2 ** 2 // 4
2 ** 3 // 8

let a = 2;
a **= 2;
