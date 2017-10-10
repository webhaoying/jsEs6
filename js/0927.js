/********************************************export与import****************************************/
// 需要特别注意的是，export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。

// 报错
// export 1;
//
// // 报错
// var m = 1;
// export m;
// // 上面两种写法都会报错，因为没有提供对外的接口。第一种写法直接输出1，第二种写法通过变量m，还是直接输出1。1只是一个值，不是接口。正确的写法是下面这样。
//
// // 写法一
// export var m = 1;
//
// // 写法二
// var m = 1;
// export {m};
//
// // 写法三
// var n = 1;
// export {n as m};


//export与import语句都应该放在模块顶层或者说是一个js文件的最外层，而不能放在函数中

//
// 如果要使用的常量非常多，可以建一个专门的constants目录，将各种常量写在不同的文件里面，保存在该目录下。
//
// // constants/db.js
// export const db = {
//     url: 'http://my.couchdbserver.local:5984',
//     admin_username: 'admin',
//     admin_password: 'admin password'
// };
//
// // constants/user.js
// export const users = ['root', 'admin', 'staff', 'ceo', 'chief', 'moderator'];
// 然后，将这些文件输出的常量，合并在index.js里面。
//
// // constants/index.js
// export {db} from './db';
// export {users} from './users';
// 使用的时候，直接加载index.js就可以了。
//
// // script.js
// import {db, users} from './index';

// import命令会被 JavaScript 引擎静态分析，先于模块内的其他模块执行（叫做”连接“更合适),意思就是
//import 命令是js文件编译阶段就执行了，就已经完成了编译工作，并不是等待js文件执行的时候，才完成import操作，
// 所以 我们在每一个组件（js文件）中，使用export或者import的时候，都要在整个文件的最顶层，外边不要包裹函数
// commonJs规范中的require是一个运行时加载木块，可以实现条件嘉爱，但是import就无法取代require的动态加载功能

// import()函数实现了按需加载，它本身就是返回一个promise对象，import()函数可以用在任何地方，不仅仅是模块，非模块的脚本也是可以使用的，
//也就是说，可以将任意一个js文件都依赖进来，并且import()是运行时候执行的，就是说，什么时候运行到这一句，也会加载指定的模块。
//import()  是异步加载，后者是同步加载。

//  import的应用举例
// （1）按需加载。
//
// import()可以在需要的时候，再加载某个模块。
//
// button.addEventListener('click', event => {
//     import('./dialogBox.js')
//         .then(dialogBox => {
//             dialogBox.open();
//         })
//         .catch(error => {
//             /* Error handling */
//         })
// });
// 上面代码中，import()方法放在click事件的监听函数之中，只有用户点击了按钮，才会加载这个模块。

/********************************************export与import  结束****************************************/



/********************************************CommonJs 与ES6模块***************************************/
/*
* 它们有两个重大差异。

 1、CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
 2、CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
 CommongJS 加载的是一个对象，该对象只有在脚本运行完才会生成完毕，ES6模块不是对象，
 它的对外皆苦只是一种静态定义，在代码静态解析阶段就会生成。
 A、针对1的解释
    CommonJS模块输出的是值的拷贝也就是说，一旦输出一个值，模块内部的变化就影响不到这个值，
    JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的import有点像 Unix 系统的“符号连接”，原始值变了，import加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。
    正是由于ES6的输入的模块变量，只是一个符号链接，它的变量总是绑定其所在的模块。因为变量制度，对他重新赋值就会报错。也正因为规定了它的只读，让引用该输出脚本的所有的引入脚本，拿到的值都是一样的，都是一样的实例。
*
 /********************************************CommonJs 与ES6模块*  结束****************************************/



 /********************************************一些ES6的编程规则 ****************************************/
// * 使用扩展运算符（...）拷贝数组。

// bad
const len = items.length;
const itemsCopy = [];
let i;

for (i = 0; i < len; i++) {
    itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];

// *********那些需要使用函数表达式的场合，尽量用箭头函数代替。因为这样更简洁，而且绑定了this。
// bad
[1, 2, 3].map(function (x) {
    return x * x;
});

// good   一句话的程序，原本可以省略return
[1, 2, 3].map((x) => {
    return x * x;
});

// best
[1, 2, 3].map(x => x * x);


// // bad
// const self = this;
// const boundMethod = function(...params) {
//     return method.apply(self, params);
// }
//
// // acceptable
// const boundMethod = method.bind(this);
//
// // best
// const boundMethod = (...params) => method.apply(this, params);

// Class
// 总是用Class，取代需要prototype的操作。因为Class的写法更简洁，更易于理解。

// bad
function Queue(contents = []) {
    this._queue = [...contents];
}
Queue.prototype.pop = function() {
    const value = this._queue[0];
    this._queue.splice(0, 1);
    return value;
}

// good
class Queue {
    constructor(contents = []) {
        this._queue = [...contents];
    }
    pop() {
        const value = this._queue[0];
        this._queue.splice(0, 1);
        return value;
    }
}

/*
* 模块
* 首先，Module语法是JavaScript模块的标准写法，坚持使用这种写法，使用import取代require，并且使用export取代
* module.exports
*
* 2009年，美国程序员Ryan Dahl创造了node.js项目，将javascript语言用于服务器端编程。这标志"Javascript模块化编程"正式诞生。因为老实说，在浏览器环境下，没有模块也不是特别大的问题，毕竟网页程序的复杂性有限；但是在服务器端，一定要有模块，与操作系统和其他应用程序互动，否则根本没法编程。NodeJS是CommonJS规范的实现，webpack 也是以CommonJS的形式来书写。
*
*
* CommonJS是主要为了JS在后端的表现制定的，他是不适合前端的，AMD(异步模块定义)出现了，它就主要为前端JS的表现制定规范。

 AMD是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。


 现在比较流行的AMD规范库：require.js和curl.js
 CMD也是为了解决js文件在前端的模块化应用，seajs就是基于AMD规范写的一个前端js库
 1、因为我们的常规引用js文件，是需要引入很多的script来引用js文件，这个引入会阻断页面的渲染，让浏览器暂时停止响应页面，并且还有跟根据先后书按需来确保彼此之间的严格的依赖关系。
 2、require.js就是为了解决这两个问题
   a、实现js文件的异步加载，避免页面失去响应。
   b、管理模块之间的依赖性，便于代码的编写和维护。
 3、webpack 是如何将CommonJs转化成浏览器可解析的呢
    a、首先webpack要将import和export还有module进行封装，用一个函数将其包裹，利用函数的作用域，实现了模块化的依赖效果，然后自动载入入口模块，控制缓存模块（这里与ES6的import不同，这里有缓存，但是import是动态更新的）
*
* */


 /********************************************一些ES6的编程规则 结束****************************************/





