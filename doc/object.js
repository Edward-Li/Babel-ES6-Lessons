

//ES6允许直接写入变量和函数，作为对象的属性和方法
var foo = 'bar';
var baz = { foo };

console.log(baz);

var baz = { foo: foo };

//除了属性简写，方法也可以简写
var o = {
    foo,
    method() { return "Hello!"; }
};

//实际的例子
var birth = '2000/01/01';
var Person = {
  name: '张三',
  birth,
  hello() { console.log('我的名字是', this.name); }
};

console.log(Person);
Person.hello();


//属性的赋值器（setter）和取值器（getter）也是采用这种写法
var cart = {
  _wheels: 4,

  get wheels () {
    return this._wheels;
  },

  set wheels (value) {
    if (value < this._wheels) {
      throw new Error('数值太小了！');
    }
    this._wheels = value;
  }
}





//属性名表达式
var lastWord = 'last word';

var a = {
  'first word': 'hello',
  [lastWord]: 'world'
};

a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"

//定义方法名
let obj = {
  ['h'+'ello']() {
    return 'hi';
  }
};

obj.hello() // hi






//方法的name属性
var person = {
  sayName() {
    console.log(this.name);
  },
  get firstName() {
    return "Nicholas";
  }
};

person.sayName.name   // "sayName"
person.firstName.name // "get firstName"


//如果对象的方法是一个Symbol值，那么`name`属性返回的是这个Symbol值的描述
const key1 = Symbol('description');
const key2 = Symbol();
let obj = {
  [key1]() {},
  [key2]() {},
};
obj[key1].name // "[description]"
obj[key2].name // ""

console.log(obj[key1].name);
console.log(obj[key2].name);



//Object.is() 
//ES5比较两个值是否相等，只有两个运算符：相等运算符（`==`）和严格相等运算符（`===`）。它们都有缺点，前者会自动转换数据类型，后者的`NaN`不等于自身，以及`+0`等于`-0`。JavaScript缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等。
//ES6提出“Same-value equality”（同值相等）算法，用来解决这个问题。`Object.is`就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。
console.log('foo' === 'foo');
Object.is('foo', 'foo')
// true
console.log({} === {});
Object.is({}, {})
// false



//Object.assign()
//方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）
var target = { a: 1 };

var source1 = { b: 2 };
var source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}

//如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性
var target = { a: 1, b: 1 };

var source1 = { b: 2, c: 2 };
var source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}

//`Object.assign`方法实行的是浅拷贝，而不是深拷贝
//源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用
var obj1 = {a: {b: 1}};
var obj2 = Object.assign({}, obj1);

obj1.a.b = 2;
obj2.a.b // 2




//为对象添加属性
//为对象添加方法
//克隆对象  Object.assign({}, origin)
//合并多个对象
//为属性指定默认值




//属性的可枚举性
//对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。`Object.getOwnPropertyDescriptor`方法可以获取该属性的描述对象。
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }

//描述对象的`enumerable`属性，称为”可枚举性“，如果该属性为`false`，就表示某些操作会忽略当前属性。

//ES5有三个操作会忽略`enumerable`为`false`的属性。

//- `for...in`循环：只遍历对象自身的和继承的可枚举的属性
//- `Object.keys()`：返回对象自身的所有可枚举的属性的键名
//- `JSON.stringify()`：只串行化对象自身的可枚举的属性

