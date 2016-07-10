
//字符的Unicode表示法
console.log("\u0061");
// "a"

console.log("\uD842\uDFB7");
// "𠮷"


//codePointAt()  JavaScript内部，字符以UTF-16的格式储存，每个字符固定为2个字节
var s = "𠮷";

console.log(s.length); // 2
console.log(s.charAt(0)); // ''
console.log(s.charAt(1)); // ''
console.log(s.charCodeAt(0)); // 55362
console.log(s.charCodeAt(1)); // 57271

var s = '𠮷a';

console.log(s.codePointAt(0));  // 134071
console.log(s.codePointAt(1));  // 57271
console.log(s.charCodeAt(2));  // 97


//String.fromCodePoint()  
console.log(String.fromCharCode(0x20BB7));

console.log(String.fromCodePoint(0x20BB7));
// "𠮷"
String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'
// true




//字符串的遍历器接口
for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"
// "o"
// "o"



//at()
'abc'.charAt(0) // "a"
'𠮷'.charAt(0) // "\uD842"
'abc'.at(0) // "a"
'𠮷'.at(0) // "𠮷"


//normalize()
'\u01D1'==='\u004F\u030C' //false

'\u01D1'.length // 1
'\u004F\u030C'.length // 2

'\u01D1'.normalize() === '\u004F\u030C'.normalize()
// true


//includes(), startsWith(), endsWith()
var s = 'Hello world!';

console.log(s.startsWith('Hello')); // true
console.log(s.endsWith('!')); // true
console.log(s.includes('o')); // true

var s = 'Hello world!';

console.log(s.startsWith('world', 6)); // true
console.log(s.endsWith('Hello', 5)); // true
console.log(s.includes('Hello', 6)); // false


//repeat()
console.log('x'.repeat(3)); // "xxx"
console.log('hello'.repeat(2)); // "hellohello"
console.log('na'.repeat(0)); // ""


//padStart()，padEnd()
console.log('x'.padStart(5, 'ab')); // 'ababx'
console.log('x'.padStart(4, 'ab')); // 'abax'

console.log('x'.padEnd(5, 'ab')); // 'xabab'
console.log('x'.padEnd(4, 'ab')); // 'xaba'


//提示字符串格式
console.log('12'.padStart(10, 'YYYY-MM-DD')); // "YYYY-MM-12"
console.log('09-12'.padStart(10, 'YYYY-MM-DD')); // "YYYY-09-12"



//模板字符串
$('#result').append(
  'There are <b>' + basket.count + '</b> ' + 
  'items in your basket, ' +
  '<em>' + basket.onSale +
  '</em> are on sale!'
);

$('#result').append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);

$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`.trim());



// 普通字符串
`In JavaScript \n is a line-feed.`

// 多行字符串
`In JavaScript this is
 not legal.`

console.log(`string text line 1
string text line 2`);

// 字符串中嵌入变量
var name = "Bob", time = "today";
console.log(`Hello ${name}, how are you ${time}?`);

//使用反引号，则前面要用反斜杠转义
var greeting = `\`Yo\` World!`;


//大括号内部可以放入任意的JavaScript表达式，可以进行运算，以及引用对象属性
var x = 1;
var y = 2;

console.log(`${x} + ${y} = ${x + y}`)
// "1 + 2 = 3"

`${x} + ${y * 2} = ${x + y * 2}`
// "1 + 4 = 5"

var obj = {x: 1, y: 2};
`${obj.x + obj.y}`
// 3


//模板字符串之中还能调用函数
function fn() {
  return "Hello World";
}

`foo ${fn()} bar`
// foo Hello World bar


//模板字符串甚至还能嵌套
const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;

const data = [
    { first: '<Jane>', last: 'Bond' },
    { first: 'Lars', last: '<Croft>' },
];

console.log(tmpl(data));





//标签模板 标签模板”的一个重要应用，就是过滤HTML字符串，防止用户输入恶意内容
console.log`123`
// 等同于
console.log`123`



function tag(stringArr, ...values){
  // ...
}
var a = 5;
var b = 10;

tag`Hello ${ a + b } world ${ a * b }`;



//
function passthru(literals, ...values) {
  var output = "";
  for (var index = 0; index < values.length; index++) {
    output += literals[index] + values[index];
  }

  output += literals[index]
  return output;
}

var total = 30;
var msg = passthru`The total is ${total} (${total*1.05} with tax)`;

console.log(msg); // "The total is 30 (31.5 with tax)"


//代码通过`jsx`函数，将一个DOM字符串转为React对象
jsx`
  <div>
    <input
      ref='input'
      onChange='${this.handleChange}'
      defaultValue='${this.state.value}' />
      ${this.state.value}
   </div>
`

//String.raw()
String.raw`Hi\n${2+3}!`;
// "Hi\\n5!"

String.raw`Hi\u000A!`;
// 'Hi\\u000A!'
