//Array.from()  
//用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象

//JavaScript原有的表示“集合”的数据结构 Array Object Map Set
//Iterator接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即`for...of`循环
//所谓类似数组的对象，本质特征只有一点，即必须有`length`属性。因此，任何有`length`属性的对象，都可以通过`Array.from`方法转为数组


let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']

console.log(arr1);
console.log(arr2);

//只要是部署了Iterator接口的数据结构，`Array.from`都能将其转为数组。
//字符串 Set 
Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']

let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']


//`Array.from`还可以接受第二个参数，
//作用类似于数组的`map`方法，用来对每个元素进行处理，将处理后的值放入返回的数组

Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]

Array.from([1, , 2, , 3], (n) => n || 0)
// [1, 0, 2, 0, 3]





//Array.of()  用于将一组值，转换为数组
//解决由于参数不同而导致的重载

Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]

Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]


//数组实例的copyWithin()
//在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组

Array.prototype.copyWithin(target, start = 0, end = this.length)

[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]


// 数组实例的find()和findIndex()
//找出第一个符合条件的数组成员

console.log([1, 4, -5, 10, -1].find((n) => n < 0));
// -5

[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10


[1, 4, -5, 10, -4].findIndex((n) => n < 0)
//2

[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2




//数组实例的fill()  用于空数组的初始化,数组中已有的元素，会被全部抹去
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)
// [7, 7, 7]

['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']


//数组实例的entries()，keys()和values()
//Map

for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"


//数组实例的includes()  返回一个布尔值，表示某个数组是否包含给定的值
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, NaN].includes(NaN); // true


//Map和Set数据结构有一个`has`方法，需要注意与`includes`区分


