function bind() {
    var args = Array.prototype.slice.call(arguments),
        func = (this instanceof Function) ? this : args.shift(),
        context = args.shift();

    return function(){
        return func.apply(context, args.concat(Array.prototype.slice.call(arguments)));
    }
}

Function.prototype.bind = bind;

var o = {
    x: 1,
    foo: function (a, b) {
        return this.x + a + b;
    }
};

var f1 = o.foo.bind({x:2}, 1);
var f2 = bind(o.foo, {x:2}, 1);
var f3 = bind(bind(o.foo, {x:2}), {}, 1);

console.log(f1(5) === f2(5));
console.log(f1(5) === f3(5));