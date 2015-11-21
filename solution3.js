function add(n) {
    var result = {};
    result.add = arguments.callee;
    result.valueOf = function() { return result.accumulator; };
    result.accumulator = (this.accumulator) ? (this.accumulator + n) : n;
    return result;
}

var acc = add(1).add(2).add(3).add(4);
console.log(acc + 5 === 15);

var acc1 = add(1).add(2);
var acc2 = acc1.add(1).add(2);

console.log(acc1 + 1 === 4);
console.log(acc2 + 1 === 7);
