/**
 * Created by roboterra_rd on 2017/9/20.
 */
/************模版字符串*************/
var  name = '张浩';
var age = 12;
alert(`
    你好，${name},原来你今年${age}岁了。
`);
/************模版字符串结束*************/


/************indexOf()的使用*************/
var  arr0 = [1,2,30,'30','xyc'];
arr0.indexOf(1);// 0
arr0.indexOf(30);// 2
arr0.indexOf('30');// 3  注意30 和'30'是不一样的

/************indexOf()的使用结束**************/


/************slice()的使用*************/
var  arr0 = [1,2,30,'30','xyc'];
arr0.slice(0,2);// [1,2,30] 从下标0开始，截止到下标3但是不包括3
arr0.slice(3);// 从下标3并且包括3，一直到结束
var arr0Copy=arr0.slice();// slice()内部没有参数的时候，就是复制一个数组，slice()的返回值是一个新的数组
arr0Copy ==arr0//false
/**
 复制之后的数组并不相等，因为[],{} 都是js中的引用类型数据，他们在内存的
 存储是一个栈区和堆区配合的机制，实际对象或者数组存储在堆区，栈区存储的是一个地址，这个地址指向对应的对象或者数组在堆区的地址，所以针对引用对象的比较，实际上是对比的栈区的地址。由于slice是生成一个新的数组，因此，必然导致堆区中有两个数组，而这两个数组虽然内容一致但却存储在了堆区的不同地方，，也就是说栈区存储的地址是不同的，所以新创建的数组和原数组是相等的。

 js中基本数据类型的存储，是在内存的栈区直接存储的键值对，是实际值的比较。
 * */

/************slice()的使用结束**************/


/************对象的属性或者方法的引用************/
var  xiaoming0 = {
    name:'xiaoming0',
    'middle-school':'DX zhognxue'
};
/*
* 首先说明，当middle-school这样的非严格标砖的变量命名(英文、汉字、$、_  或者是驼峰)
* 此时应该是将属性名用引号扩起来
* 并且是，引用的时候，必须用[]的这种形式
* 但是，针对name这样的标准属性，引用的时候可以使用 '.name'或者'xiaoming0['name']'*/
xiaoming0.name;// xiaoming0
xiaoming0['middle-school'];// DX zhognxue
xiaoming0['name'];// 与 .name 的使用方法是一样的

/************对象的属性或者方法的引用结束**************/


/************forEach()**************/
var a = ['A', 'B', 'C'];
a.forEach(function (element, index, array) {
    // element: 指向当前元素的值
    // index: 指向当前索引
    // array: 指向Array对象本身
    console.log(element+index);
});
/************forEach()  结束**************/

/************** ...rest  参数的引入********/
function foo(a, b, ...rest) {
    console.log('a = ' + a);
    console.log('b = ' + b);
    console.log(rest);
    var sum=0;
    // console.log(a +b +rest);
    for(var key in rest){
        // console.log(rest[key]);

         sum += (rest[key]);
        console.log(sum);
    }
}

foo(1, 2, 3, 4, 5);
// 结果:
// a = 1
// b = 2
// Array [ 3, 4, 5 ]

foo(1);
// 结果:
// a = 1
// b = undefined
// Array []
/************** ...rest  参数的引入结束*******/




/************** let块级作用域引入*******/
/******
 *因为函数体内部定义的变量实际上都是函数内部，所以在循环等语句块中是没有办法定义只在这个循环中
 * 定义局部作用域的变量的
 * ****/

function foo() {
    for (var i=0; i<100; i++) {
        //
    }
    i += 100; // 仍然可以引用变量i
}
function foo1() {
    var sum = 0;
    for (let i=0; i<100; i++) {//这里的i 他的作用域就可以保证只在for循环中有效
        sum += i;
    }
    i += 1; // SyntaxError
}

/************** let块级作用域引入结束*******/


/************** 高阶函数的应用*******/
function add0 (x,y,f) {
    return f(x)+f(y);
}
add0(-6,5,Math.abs);//  11

/************** 高阶函数的应用  结束*******/


/************** ES5 中map()  与reduce() 的使用*******/
/*
对一个数组中的每个元素进行自乘方之后求和
其中map就是将数组中的每个元素作为参数，进行函数再运算。
reduce() 是从左往右提取参数，然后进行函数运算之后，将输出结果在与第三个值进行同样的运算,
因为reduce()方法中传的参数是一个方法
 */
var arrSum = [1,2,3];
function mapSum(a,b) {
    return a+b;
}
function squareSum(a) {
    return a*a;
}
function squareSum1(arr) {
    var squareArr = arr.map(squareSum);
    console.log(squareArr);
    return squareArr.reduce(mapSum);
}
// console.log(squareSum1(arrSum));

/************** 高阶函数的应用  结束*******/


/************** filter()方法的应用*******/
/*
* 和map()方法类似，Array的filter()方法也接收一个函数。和map()方法不同的
* filter() 被传图的函数依次作用域每个元素，然后根据返回值，是true or false
* 决定保留还是丢弃该元素。
*
* filter()j接收的回调韩式，其实可以有多个参数。通常我们仅使用第一个参数，表示Array的某个元素
* 回到函数还可以接受另外两个参数，分别为元素的下标位置和数组本身。
* */
//利用filter，巧妙的的去除Array的重复元素
var newArr0=[],
    arr01 = [123,33,3,2,13,123,2,3];
 newArr0 = arr01.filter(function (ele, index,arr) {
    return arr.indexOf(ele) === index;
});
console.log(newArr0);
/*因为indexOf函数总是返回第一个元素的位置，后续的重复元素位置与indexOf不同，因此被filter过滤掉了*/
/************** 高阶函数的应用  结束*******/






























