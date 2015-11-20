function bind() {
    var func, context, args;
    if(this instanceof Function) {
        func = this;
        context = arguments[0];
        args = Array.prototype.slice.call(arguments,1);
    } else if(arguments[0] instanceof Function){
        func = arguments[0];
        context = arguments[1];
        args = Array.prototype.slice.call(arguments,2);
    }
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