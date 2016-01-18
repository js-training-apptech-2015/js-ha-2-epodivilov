function bind() {
    var args = Array.prototype.slice.call(arguments),
        func = (this instanceof Function) ? this : args.shift(),
        context = args.shift();

    return function(){
        return func.apply(context, args.concat(Array.prototype.slice.call(arguments)));
    }
}

Function.prototype.bind = bind;

function rebind(func, context) {
    var newFn = bind(func.__origFn__ || func, context);
    newFn.__origFn__ = func.__origFn__ || func;
    return newFn;
}

function add(n) {
    var result = {};
    result.add = arguments.callee;
    result.valueOf = function() { return result.accumulator; };
    result.accumulator = (this.accumulator) ? (this.accumulator + n) : n;
    return result;
}
