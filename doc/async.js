//read file in nodejs
var fs = require("fs");

fs.readFile(__dirname + '/etc/file1', 'utf-8', function (err, data) {
    if (err) throw err;
    console.log(data);
});


//read the second with callback
fs.readFile(__dirname + '/etc/file1', 'utf-8', function (err, data) {
    if (err) throw err;
    console.log(data);

    fs.readFile(__dirname + '/etc/file2', 'utf-8', function (err, data) {
        if (err) throw err;
        console.log(data);

        fs.readFile(__dirname + '/etc/file3', 'utf-8', function (err, data) {
            if (err) throw err;
            console.log(data);
        });
    });
});


//read file with promise
var readFile = require('fs-readfile-promise');

readFile(fileA)
    .then(function (data) {
        console.log(data.toString());
    })
    .then(function () {
        return readFile(fileB);
    })
    .then(function (data) {
        console.log(data.toString());
    })
    .catch(function (err) {
        console.log(err);
    });



//Use Generator
function* gen(x) {
    var y = yield x + 2;
    return y;
}

var g = gen(1);
g.next() // { value: 3, done: false }
g.next() // { value: undefined, done: true }
g.next(2) // { value: 2, done: true }


//generator 协程写法如下
function* asyncJob() {
    // ...其他代码
    var a = yield readFile(fileA);
    // ...其他代码
    var b = yield readFile(fileB);
    // ...其他代码
    var c = yield readFile(fileC);
}



//async using generator
//首先执行Generator函数，获取遍历器对象，然后使用next 方法（第二行），执行异步任务的第一阶段。
//由于Fetch模块返回的是一个Promise对象，因此要用then方法调用下一个next 方法。
var fetch = require('node-fetch');

function* gen() {
    var url = 'https://api.github.com/users/github';
    var result = yield fetch(url);
    console.log(result.bio);
}

var g = gen();
var result = g.next();

result.value.then(function (data) {
    return data.json();
}).then(function (data) {
    g.next(data);
});


//Thunk函数      函数式编程
//一种意见是"传值调用"（call by value），即在进入函数体之前，就计算`x + 5`的值（等于6），再将这个值传入函数f 。C语言就采用这种策略。
//另一种意见是"传名调用"（call by name），即直接将表达式`x + 5`传入函数体，只在用到它的时候求值。Haskell语言采用这种策略。

var x = 1;

function f(m) {
    return m * 2;
}

f(x + 5)

f(x + 5)
// 传值调用时，等同于
f(6)

f(x + 5)
    // 传名调用时，等同于
    (x + 5) * 2


//what thunk means
function f(m) {
    return m * 2;
}

f(x + 5);

// 等同于

var thunk = function () {
    return x + 5;
};

function f(thunk) {
    return thunk() * 2;
}



var readFileThunk = Thunk(fileName);
readFileThunk(callback);

var Thunk = function (fileName) {
    return function (callback) {
        return fs.readFile(fileName, callback);
    };
};


//使用Thunkify模块
var thunkify = require('thunkify');
var fs = require('fs');

var read = thunkify(fs.readFile);

read(__dirname + '/etc/file1', 'utf-8')(function (err, str) {
    if (err) throw err;
    console.log(str);
});




//Generator 函数的流程管理 
//Thunk函数现在可以用于Generator函数的自动流程管理 

var fs = require('fs');
var thunkify = require('thunkify');
var readFile = thunkify(fs.readFile);

var gen = function* () {
    var r1 = yield readFile(__dirname + '/etc/file1', 'utf-8');
    console.log(r1.toString());
    var r2 = yield readFile(__dirname + '/etc/file2', 'utf-8');
    console.log(r2.toString());
};

function run(fn) {
    var gen = fn();

    function next(err, data) {
        var result = gen.next(data);
        if (result.done) return;
        result.value(next);
    }

    next();
}

run(gen);

//有了这个执行器，执行Generator函数方便多了。不管有多少个异步操作，直接传入`run`函数即可。
//当然，前提是每一个异步操作，都要是Thunk函数，也就是说，跟在`yield`命令后面的必须是Thunk函数。
var gen = function* () {
    var f1 = yield readFile('fileA');
    var f2 = yield readFile('fileB');
    // ...
    var fn = yield readFile('fileN');
};

run(gen);


//co 的基本用法
var fs = require('fs');
var thunkify = require('thunkify');
var co = require("co");

var readFile = thunkify(fs.readFile);

var gen = function* () {
    var r1 = yield readFile(__dirname + '/etc/file1', 'utf-8');
    var r2 = yield readFile(__dirname + '/etc/file2', 'utf-8');
    console.log(r1.toString());
    console.log(r2.toString());
};


co(gen);

//前面说过，Generator就是一个异步操作的容器。它的自动执行需要一种机制，当异步操作有了结果，能够自动交回执行权。
//两种方法可以做到这一点。
//（1）回调函数。将异步操作包装成Thunk函数，在回调函数里面交回执行权。
//（2）Promise 对象。将异步操作包装成Promise对象，用then方法交回执行权。



var fs = require('fs');

var readFile = function (fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function (error, data) {
            if (error) reject(error);
            resolve(data);
        });
    });
};

var gen = function* () {
    var f1 = yield readFile(__dirname + '/etc/file1', 'utf-8');
    var f2 = yield readFile(__dirname + '/etc/file2', 'utf-8');
    console.log(f1.toString());
    console.log(f2.toString());
};


//单次执行
var g = gen();

g.next().value.then(function (data) {
    g.next(data).value.then(function (data) {
        g.next(data);
    });
});


//run 方法
function run(gen) {
    var g = gen();

    function next(data) {
        var result = g.next(data);
        if (result.done) return result.value;
        result.value.then(function (data) {
            next(data);
        });
    }

    next();
}

run(gen);


//处理并发的异步操作
co(function* () {
    var r1 = yield [readFile(__dirname + '/etc/file1', 'utf-8'), readFile(__dirname + '/etc/file3', 'utf-8')];
    console.log(r1.toString());
    var r2 = yield [readFile(__dirname + '/etc/file2', 'utf-8')];
    console.log(r2.toString());
}).catch(onerror);


co(function* () {
    var res = yield { 1: Promise.resolve(1), 2: Promise.resolve(2) };
    console.log(res);
}).catch(onerror);


co(function* () {
    var values = [n1, n2, n3];
    yield values.map(somethingAsync);
});

function* somethingAsync(x) {
    // do something async
    return y
}



//async函数 
//ES7提供了`async`函数，使得异步操作变得更加方便。`async`函数是什么？一句话，`async`函数就是Generator函数的语法糖。
var fs = require('fs');

var readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) reject(error);
      resolve(data);
    });
  });
};

var gen = function* (){
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

//ES7
var asyncReadFile = async function (){
  var f1 = await readFile('/etc/fstab');
  var f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};



//（1）`async`函数返回一个Promise对象。
async function f() {
  return 'hello world';
}

f().then(v => console.log(v))
// "hello world"

async function f() {
  throw new Error('出错了');
}

f().then(
  v => console.log(v),
  e => console.log(e)
)

//（2）`async`函数返回的Promise对象，必须等到内部所有`await`命令的Promise对象执行完，才会发生状态改变。也就是说，只有`async`函数内部的异步操作执行完，才会执行`then`方法指定的回调函数。
async function getTitle(url) {
  let response = await fetch(url);
  let html = await response.text();
  return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('https://tc39.github.io/ecma262/').then(console.log)
// "ECMAScript 2017 Language Specification"


//（3）正常情况下，`await`命令后面是一个Promise对象。如果不是，会被转成一个立即`resolve`的Promise对象。
async function f() {
  return await 123;
}

f().then(v => console.log(v))
// 123


async function f() {
  await Promise.reject('出错了');
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))


//（4）如果`await`后面的异步操作出错，那么等同于`async`函数返回的Promise对象被`reject`。
//只要一个`await`语句后面的Promise变为`reject`，那么整个`async`函数都会中断执行。




//async 函数的用法

function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value)
}

asyncPrint('hello world', 50);

//注意点
//第一点，`await`命令后面的Promise对象，运行结果可能是rejected，所以最好把`await`命令放在`try...catch`代码块中。
async function myFunction() {
  await somethingThatReturnsAPromise()
  .catch(function (err) {
    console.log(err);
  };
}
//第二点，多个`await`命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
let foo = await getFoo();
let bar = await getBar();

let [foo, bar] = await Promise.all([getFoo(), getBar()]);

let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;

//第三点，`await`命令只能用在`async`函数之中，如果用在普通函数，就会报错。


async function dbFuc(db) {
  let docs = [{}, {}, {}];

  // 报错
  docs.forEach(function (doc) {
    await db.post(doc);
  });
}


//上面代码会报错，因为await用在普通函数之中了。但是，如果将`forEach`方法的参数改成`async`函数，也有问题。

async function dbFuc(db) {
  let docs = [{}, {}, {}];

  // 可能得到错误结果
  docs.forEach(async function (doc) {
    await db.post(doc);
  });
}

//上面代码可能不会正常工作，原因是这时三个`db.post`操作将是并发执行，也就是同时执行，而不是继发执行。正确的写法是采用`for`循环。

async function dbFuc(db) {
  let docs = [{}, {}, {}];

  for (let doc of docs) {
    await db.post(doc);
  }
}

//多个请求并发执行，可以使用`Promise.all`方法
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = await Promise.all(promises);
  console.log(results);
}


async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = [];
  for (let promise of promises) {
    results.push(await promise);
  }
  console.log(results);
}