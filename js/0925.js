/**
 * Created by roboterra_rd on 2017/9/25.
 */
/*
 sort()方法也是一个高阶函数，因此可以根据不同需求，控制自己传减去的函数参数
 */

var arr0 = ['Google', 'apple', 'Microsoft'];
arr0.sort(function (s1, s2) {
    x1 = s1.toUpperCase();
    x2 = s2.toUpperCase();
    if (x1 < x2) {
        return -1;
    }
    if (x1 > x2) {
        return 1;
    }
    return 0;
}); // ['apple', 'Google', 'Microsoft']

/*
 sort()方法结束
 */
/************闭包的基本原理************************************************************/
/* 1、匿名函数立即执行*/
(function (x) {
    return x*x;
})();

/* 2、闭包函数*/
function count() {
    var arr = [];
    for (var i=1; i<=3; i++) {
        arr.push(function () {
            return i * i;
        });
    }
    return arr;
}

var results = count();
var f1 = results[0];
var f2 = results[1];
var f3 = results[2];
f1(); // 16
f2(); // 16
f3(); // 16
/*
* 全部都是16！原因就在于返回的函数引用了变量i，但它并非立刻执行。等到3个函数都返回时，它们所引用的变量i已经变成了4，因此最终结果为16。

 返回闭包时牢记的一点就是：返回函数不要引用任何循环变量，或者后续会发生变化的变量。

 如果一定要引用循环变量怎么办？方法是再创建一个函数，用该函数的参数绑定循环变量当前的值，无论该循环变量后续如何更改，已绑定到函数参数的值不变：
* */

function count() {
    var arr = [];
    for (var i=1; i<=3; i++) {
        arr.push((function (n) {
            return function () {
                return n * n;
            }
        })(i));
    }
    return arr;
}

var results = count();
var f1 = results[0];
var f2 = results[1];
var f3 = results[2];

f1(); // 1
f2(); // 4
f3(); // 9


/************闭包的基本原理  结束************************************************************/


/************箭头函数************************************************************/

// 1、可变参数
(x,y, ...reset)=>{
    var i,sum = x+y;
    for(i=0;i<reset.length;i++){
    sum +=reset[i];
    }
    return sum;

}
// 2、返回对象
 x=>{foo:x}// error
 x=> ({foo:x})// success  必须使用小括号扩起来
// 3、箭头函数中的this已经按照此法作用域绑定饿，总是指向外层调用者，并不需要在用bind或者that=this转换了

var obj0 = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = () => new Date().getFullYear() - this.birth; // this指向obj对象
        return fn();
    }
};
obj0.getAge(); // 25


/************箭头函数 结束************************************************************/


/************generator 生成器 ES6 ************************************************************/
// 函数只能返回一次，所以必须返回一个Array。但是，如果换成generator，就可以一次返回一个数，不断返回多次。用generator改写如下：

function* fib(max) {
    var
        t,
        a = 0,
        b = 1,
        n = 1;
    while (n < max) {
        yield a;
        t = a + b;
        a = b;
        b = t;
        n ++;
    }
    return a;
}

// 直接调用试试：

fib(5); // fib {[[GeneratorStatus]]: "suspended", [[GeneratorReceiver]]: Window}
// 直接调用一个generator和调用函数不一样，fib(5)仅仅是创建了一个generator对象，还没有去执行它。

// 调用generator对象有两个方法，一是不断地调用generator对象的next()方法：

var f = fib(5);
f.next(); // {value: 0, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 2, done: false}
f.next(); // {value: 3, done: true}
// next()方法会执行generator的代码，然后，每次遇到yield x;就返回一个对象{value: x, done: true/false}，然后“暂停”。返回的value就是yield的返回值，done表示这个generator是否已经执行结束了。如果done为true，则value就是return的返回值。
//
// 当执行到done为true时，这个generator对象就已经全部执行完毕，不要再继续调用next()了。
//
// 第二个方法是直接用for ... of循环迭代generator对象，这种方式不需要我们自己判断done：

for (var x of fib(5)) {
    console.log(x); // 依次输出0, 1, 1, 2, 3
}

/************generator 生成器 ES6 结束************************************************************/


/************Date***********************************************************
 * 注意，当前时间是浏览器从本机操作系统获取的时间，所以不一定准确，因为用户可以把当前时间设定为任何值。

 */

/************Date 结束************************************************************/

/************RegExp***********************************************************/
 //   / reg/这个双符号就是代表的正则，与[]、{} 可以一同理解

 // 用正则表达式切分字符串比用固定的字符更灵活，请看正常的切分代码：

 'a b   c'.split(' '); // ['a', 'b', '', '', 'c']
 // 嗯，无法识别连续的空格，用正则表达式试试：

 'a b   c'.split(/\s+/); // ['a', 'b', 'c']
 // 无论多少个空格都可以正常分割。加入,试试：

 'a,b, c  d'.split(/[\s\,]+/); // ['a', 'b', 'c', 'd']
 // 再加入;试试：

 'a,b;; c  d'.split(/[\s\,\;]+/); // ['a', 'b', 'c', 'd']

/************RegExp 结束************************************************************/


/************JSON ************************************************************/
/*
json的字符串中，必须使用双引号，并且对象的键也必须使用双引号
JSON.stringify();
JSON.parse();
 */
/************JSON 结束************************************************************/



/************构造函数 ************************************************************/
/*
 注意，如果不写new，这就是一个普通函数，它返回undefined。
 但是，如果写了new，它就变成了一个构造函数，
 它绑定的this指向新创建的对象，并默认返回this，也就是说，不需要在最后写return this;。
 构造函数的首字母要求大写（规范一下而已）,同时，将公用的方法，定义到构造函数的prototype中。
 */
function Student(name) {
    this.name = name;
    this.hello = function () {
        alert('Hello, ' + this.name + '!');
    }
}
var xiaoming0 = new Student('小明');
xiaoming0.name; // '小明'
xiaoming0.hello(); // Hello, 小明!

//或者是规范一下，将所有的实例都会引用的一个方法，拆分出来进行定义
function Student0(props) {
    this.name = props.name || 'Unnamed';
}

Student0.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
};
/************构造函数 结束************************************************************/


/************ES6中的class引入，让定义类更简单************************************************************/

class Student1 {
    constructor(name) {
        this.name = name;
    }

    hello() {
        alert('Hello, ' + this.name + '!');
    }
}

var xiaoming1 = new Student1('小明');
xiaoming1.hello();
//class 的定义包括了构造函数constructor   和定义在圆形对象上的函数hello(),注意是没有function关键字的
// class的引入  极大程度上监护了继承的代码

class PrimaryStudent extends Student {
    constructor(name, grade) {
        super(name); // 记得用super调用父类的构造方法!  意思就是属性继承的时候，需要super()一下，但是原型中的function就不用单独super() 一下
        this.grade = grade;
    }

    myGrade() {
        alert('I am at grade ' + this.grade);
    }
}
new PrimaryStudent(1234444,222).hello();

/************ES6中的class引入，结束************************************************************/


/************promise的使用 **********/
// promise 就是将js的单线程操作，变更为可以异步处理的情形，可以使用链式编程，并且
// 可以针对承诺执行的结果，进行不同的逻辑处理。
// resolve 与 reject 分别代表成功或者失败的回调函数


/**************************************************************promise的使用 结束************************************************************/
/***prop() 与 attr()**/
// prop()方法和attr()类似，但是HTML5规定有一种属性在DOM节点中可以没有值，只有出现与不出现两种，例如：

<input id="test-radio" type="radio" name="test" checked value="1">
    // 等价于：

<input id="test-radio" type="radio" name="test" checked="checked" value="1">
    // attr()和prop()对于属性checked处理有所不同：

var radio = $('#test-radio');
radio.attr('checked'); // 'checked'
radio.prop('checked'); // true
// prop()返回值更合理一些。不过，用is()方法判断更好：

var radio = $('#test-radio');
radio.is(':checked'); // true
// 类似的属性还有selected，处理时最好用is(':selected')。
/*******************************************prop() 与 attr() 结束**************************************************/
/*******************************************dom 操作**************************************************/

/*append()把DOM添加到最后，prepend()则把DOM添加到最前
 另外注意，如果要添加的DOM节点已经存在于HTML文档中，它会首先从文档移除，然后再添加，也就是说，用append()，你可以移动一个DOM节点。

 如果要把新节点插入到指定位置，例如，JavaScript和Python之间，那么，可以先定位到JavaScript，然后用after()方法：

 var js = $('#test-div>ul>li:first-child');
 js.after('<li><span>Lua</span></li>');
 也就是说，同级节点可以用after()或者before()方法。
* */
/*******************************************dom 操作结束**************************************************/


/*******************************************jquery 事件绑定**************************************************/
/*
* 鼠标事件

 click: 鼠标单击时触发；
 dblclick：鼠标双击时触发；
 mouseenter：鼠标进入时触发；
 mouseleave：鼠标移出时触发；
 mousemove：鼠标在DOM内部移动时触发；
 hover：鼠标进入和退出时触发两个函数，相当于mouseenter加上mouseleave。

*
 * keydown：键盘按下时触发；
 keyup：键盘松开时触发；
 keypress：按一次键后触发。
  *
  * 其他事件

 focus：当DOM获得焦点时触发；
 blur：当DOM失去焦点时触发；
 change：当<input>、<select>或<textarea>的内容改变时触发；
 submit：当<form>提交时触发；
 ready：当页面被载入并且DOM树完成初始化后触发。

 其中，ready仅作用于document对象。由于ready事件在DOM完成初始化后触发，且只触发一次，所以非常适合用来写其他的初始化代码
  *
  *
  * */

// $(document).ready(function () {
//     // on('submit', function)也可以简化:
//     $('#testForm).submit(function () {
//     alert('submit!');
// });
// });
// 可以简化为

$(function () {
    
});//就是document加载完毕之后的事件处理函数

/*
* 事件参数

 有些事件，如mousemove和keypress，我们需要获取鼠标位置和按键的值，否则监听这些事件就没什么意义了。
 所有事件都会传入Event对象作为参数，可以从Event对象上获取到更多的信息：

 $(function () {
 $('#testMouseMoveDiv').mousemove(function (e) {
 $('#testMouseMoveSpan').text('pageX = ' + e.pageX + ', pageY = ' + e.pageY);
 });
 });
*
*一个已被绑定的事件可以解除绑定，通过off('click', function)实现：
*为了实现移除效果，可以使用off('click')一次性移除已绑定的click事件的所有处理函数。

 同理，无参数调用off()一次性移除已绑定的所有类型的事件处理函数。
*
**************************************change 事件*********************
*当用户在文本框中输入时，就会触发change事件。但是，如果用JavaScript代码去改动文本框的值，将不会触发change事件：
*var input = $('#test-input');
 input.val('change it!'); // 无法触发change事件
 有些时候，我们希望用代码触发change事件，可以直接调用无参数的change()方法来触发该事件：

 var input = $('#test-input');
 input.val('change it!');
 input.change(); // 触发change事件
 input.change()相当于input.trigger('change')，它是trigger()方法的简写。

 为什么我们希望手动触发一个事件呢？如果不这么做，很多时候，我们就得写两份一模一样的代码
*
*
*
*
* */



/*******************************************jquery 事件绑定 结束**************************************************/




/*******************************************jquery动画**************************************************/
/* show()、hide()、toggle()、slideUp()、slideDown()、slideToggle()、fadeIn()、fadeOut()、fadeToggle()传的参数可以是毫秒数 ，
也可以是slow、fast
* */

/* $().animate({},3000,function(){}) 其中首个参数对象中是一些数值类的css属性，3000为毫秒数，func为动画完成后的回调函数
 * */

/*
* delay() 方法可以用来将动画暂停
* */

/*
* 为什么有的动画没有效果

 你可能会遇到，有的动画如slideUp()根本没有效果。这是因为jQuery动画的原理是逐渐改变CSS的值，如height从100px逐渐变为0。但是很多不是block性质的DOM元素，对它们设置height根本就不起作用，所以动画也就没有效果。

 此外，jQuery也没有实现对background-color的动画效果，用animate()设置background-color也没有效果。这种情况下可以使用CSS3的transition实现动画效果。
*
* */
/*******************************************jquery动画结束**************************************************/


























