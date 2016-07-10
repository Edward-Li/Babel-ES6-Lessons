i //执行对大小写不敏感的匹配
g //执行全局匹配 ,查找所有匹配而非在找到第一个匹配后停止
m //执行多行匹配

//
//ES5
var regex = new RegExp('xyz', 'i');
var regex = /xyz/i;

var regex = new RegExp(/xyz/i);
var regex = /xyz/i;

//ES6
new RegExp(/abc/ig, 'i').flags
// "i"

//RegExp : These patterns are used with the exec and test methods of RegExp, 
//and with the match, replace, search, and split methods of String. 

//字符串的正则方法
//字符串对象共有4个方法，可以使用正则表达式：`match()`、`replace()`、`search()`和`split()`。
//
//ES6将这4个方法，在语言内部全部调用RegExp的实例方法，从而做到所有与正则相关的方法，全都定义在RegExp对象上。
//
//- `String.prototype.match` 调用 `RegExp.prototype[Symbol.match]`
//- `String.prototype.replace` 调用 `RegExp.prototype[Symbol.replace]`
//- `String.prototype.search` 调用 `RegExp.prototype[Symbol.search]`
//- `String.prototype.split` 调用 `RegExp.prototype[Symbol.split]`


//u修饰符 “Unicode模式” 用来正确处理大于`\uFFFF`的Unicode字符

/^\uD83D/u.test('\uD83D\uDC2A')
// false
/^\uD83D/.test('\uD83D\uDC2A')
// true


//如果不添加`u`修饰符，正则表达式就会认为字符串为两个字符，从而匹配失败
/^.$/.test(s) // false
/^.$/u.test(s) // true


//
/a{2}/.test('aa') // true
/a{2}/u.test('aa') // true
/𠮷{2}/.test('𠮷𠮷') // false
/𠮷{2}/u.test('𠮷𠮷') // true
/^\u{3}$/.test('uuu') // true

/^\S$/.test('𠮷') // false
/^\S$/u.test('𠮷') // true

/[a-z]/i.test('\u212A') // false
/[a-z]/iu.test('\u212A') // true



//y修饰符   `g`修饰符只要剩余位置中存在匹配就可，而`y`修饰符确保匹配必须从剩余的第一个位置开始
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

r1.exec(s) // ["aaa"]
r2.exec(s) // ["aaa"]

r1.exec(s) // ["aa"]
r2.exec(s) // null


var s = 'aaa_aa_a';
var r = /a+_/y;

r.exec(s) // ["aaa_"]
r.exec(s) // ["aa_"]

//`y`修饰符号隐含了头部匹配的标志`^`。
//
//```javascript
///b/y.exec('aba')
//// null
//```
//
//上面代码由于不能保证头部匹配，所以返回`null`。`y`修饰符的设计本意，就是让头部匹配的标志`^`在全局匹配中都有效。



// 没有找到匹配
'x##'.split(/#/y)
// [ 'x##' ]

// 找到两个匹配
'##x'.split(/#/y)
// [ '', '', 'x' ]

//单单一个`y`修饰符对`match`方法，只能返回第一个匹配，必须与`g`修饰符联用，才能返回所有匹配
'a1a2a3'.match(/a\d/y) // ["a1"]
'a1a2a3'.match(/a\d/gy) // ["a1", "a2", "a3"]



//上面代码中，如果字符串里面没有非法字符，`y`修饰符与`g`修饰符的提取结果是一样的。但是，一旦出现非法字符，两者的行为就不一样了
const TOKEN_Y = /\s*(\+|[0-9]+)\s*/y;
const TOKEN_G  = /\s*(\+|[0-9]+)\s*/g;

tokenize(TOKEN_Y, '3 + 4')
// [ '3', '+', '4' ]
tokenize(TOKEN_G, '3 + 4')
// [ '3', '+', '4' ]

function tokenize(TOKEN_REGEX, str) {
  let result = [];
  let match;
  while (match = TOKEN_REGEX.exec(str)) {
    result.push(match[1]);
  }
  return result;
}

tokenize(TOKEN_Y, '3x + 4')
// [ '3' ]
tokenize(TOKEN_G, '3x + 4')
// [ '3', '+', '4' ]





var r = /hello\d/y;
r.sticky // true






//flags ES6为正则表达式新增了`flags`属性，会返回正则表达式的修饰符
/abc/ig.source
/abc/ig.flags


//RegExp.escape()    字符串必须转义，才能作为正则模式

RegExp.escape('The Quick Brown Fox');
// "The Quick Brown Fox"

RegExp.escape('Buy it. use it. break it. fix it.');
// "Buy it\. use it\. break it\. fix it\."

RegExp.escape('(*.*)');
// "\(\*\.\*\)"


