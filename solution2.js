function bind() {
    var args = Array.prototype.slice.call(arguments),
        func = (this instanceof Function) ? this : args.shift(),
        context = args.shift();

    return function(){
        return func.apply(context, args.concat(Array.prototype.slice.call(arguments)));
    }
}

function rebind(func, context) {
    var newFn = bind(func.__origFn__ || func, context);
    newFn.__origFn__ = func.__origFn__ || func;
    return newFn;
}

var o = {
    x: 1,
    foo: function (a, b) {
        return this.x + a + b;
    }
};

var f1 = rebind(o.foo, {x:2});
var f2 = rebind(f1, {x:3});

console.log(f1(1,1) === 4);
console.log(f2(1,1) === 5);