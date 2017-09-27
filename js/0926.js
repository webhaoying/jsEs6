/***************************************数组的解构 ********************************************/
//基本的数组结构就是简单的模式匹配  ...tail 就是获得一个数组   如果结构不成功，变量的值就是undefined
let[a,b,c] =[1,2,3];
//a;1
//b;2
//c;3
let [head0,...tail]=[1,2,3,4];
//heade 1;
// tail [2,3,4];
let [head,...tail0]=[1];
//heade 1;
// tail [];
//解构的值优先可以指定默认值，并且右侧的数组成员要求 === undefined
let[foo =true] =[];//foo  true
let[x,y='b'] = ['a',undefined];//x =a  y =b
let[x0=1,y0=x0]=[1,2];// x0 =1   y0 =2  因为只有右侧的对应值为严格的undefined的时候，左侧的默认值才会生效

    // 对象的解构
    // 对象的解构不用可以区分位置，
let arr109 =[1,2,3];
let {0:first,[arr109.length -1]:last} = arr109;
//first  1
//last  3

//




/***************************************数组的解构 结束********************************************/


/***************************************字符串的扩展 ********************************************/




/***************************************字符串的扩展 结束********************************************/

/***************************************函数的扩展 ********************************************/
function sortNum(){
    return Arrary.prototype.slice.call(arguments).sort();
};
// 等价于  其中的...number 就相当于是拿到了这个一整个的arguments  并且注意，其中的这个...number就是要转化为一个数组
const sortNumber = (...numbers) => numbers.sort();
// 箭头函数可以让函数中的this 完全是指向函数本身，而不是指向调用他的对象
// 在箭头函数中，this的指向固定化，是因为他本身就没有this，内部的代码 就是外层代码块的this。所以箭头函数不能用来做构造函数
// 简单来讲，就是说，在一个函数中，定义他的方法的时候，就直接使用this，并不需要将外层的this传递到内层函数中去。


/***************************************函数的扩展 结束********************************************/
/***************************************数组的扩展 结束********************************************/
//下面代码的 ES5 写法中，push方法的参数不能是数组，
// 所以只好通过apply方法变通使用push方法。有了扩展运算符，就可以直接将数组传入push方法。
//    因为apply支持那种传值为数组的情况
// ES5的 写法
var arr10 = [0, 1, 2];
var arr20 = [3, 4, 5];
Array.prototype.push.apply(arr10, arr20);

// ES6 的写法
let arr112 = [0, 1, 2];
let arr21 = [3, 4, 5];
arr112.push(...arr21);


// 下面是一个类似数组的对象，Array.from将它转为真正的数组。

let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr123 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
//ES6 提供三个新的方法——entries()，keys()和values()——用于遍历数组
//唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。

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

/***************************************数组的扩展 结束********************************************/



/***************************************对象的扩展 ********************************************/
// ES6 允许在对象之中，直接写变量。这时，属性名为变量名, 属性值为变量的值。下面是另一个例子。

function f0(x, y) {
    return {x, y};
}

// 等同于

function f0(x, y) {
    return {x: x, y: y};
}

f(1, 2) // Object {x: 1, y: 2}

// Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。

const target = { a: 1 };

const source1 = { b: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
// Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。
/***************************************对象的扩展 结束********************************************/






