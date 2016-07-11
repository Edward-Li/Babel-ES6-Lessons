//ES6引入了一种新的原始数据类型Symbol，表示独一无二的值。
//它是JavaScript语言的第七种数据类型，
//前六种是：Undefined、Null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。


let s = Symbol();

typeof s
// "symbol"

console.log(typeof s);

//有参数的情况
var s1 = Symbol('foo');
var s2 = Symbol('bar');

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"


//作为属性名的Symbol
var mySymbol = Symbol();

// 第一种写法
var a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
var a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
var a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"


//Symbol类型还可以用于定义一组常量，保证这组常量的值都是不相等的
log.levels = {
  DEBUG: Symbol('debug'),
  INFO: Symbol('info'),
  WARN: Symbol('warn')
};
log(log.levels.DEBUG, 'debug message');
log(log.levels.INFO, 'info message');


//属性名的遍历
//Symbol作为属性名，该属性不会出现在`for...in`、`for...of`循环中，
//也不会被`Object.keys()`、`Object.getOwnPropertyNames()`返回。
//但是，它也不是私有属性，有一个`Object.getOwnPropertySymbols`方法，可以获取指定对象的所有Symbol属性名。

var obj = {};
var a = Symbol('a');
var b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

var objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols
// [Symbol(a), Symbol(b)]


//`Reflect.ownKeys`方法可以返回所有类型的键名，包括常规键名和Symbol键名
let obj = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3
};

Reflect.ownKeys(obj)



//## Symbol.for()，Symbol.keyFor()
//`Symbol.for()`与`Symbol()`这两种写法，都会生成新的Symbol。它们的区别是，
//前者会被登记在全局环境中供搜索，后者不会。`Symbol.for()`不会每次调用就返回一个新的Symbol类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。

var s1 = Symbol.for('foo');
var s2 = Symbol.for('foo');

s1 === s2 // true

Symbol.for("bar") === Symbol.for("bar")
// true

Symbol("bar") === Symbol("bar")


var s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

var s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined






//内置的Symbol值

