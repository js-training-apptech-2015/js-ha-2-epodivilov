var assert = chai.assert;

describe('Polyfill function bind()', function () {
    var o = {
        x: 1,
        foo: function (a, b) {
            return this.x + a + b;
        }
    };

    var f1 = o.foo.bind({x:2}, 1);
    var f2 = bind(o.foo, {x:2}, 1);
    var f3 = bind(bind(o.foo, {x:2}), {}, 1);

    it('Function.prototype.bind() == bind()', function () {
        assert.isTrue(f1(5) === f2(5))
    });

    it('Function.prototype.bind() == bind(bind())', function () {
        assert.isTrue(f1(5) === f3(5))
    });
});

describe('Function rebind()', function () {
    var o = {
        x: 1,
        foo: function (a, b) {
            return this.x + a + b;
        }
    };

    var f1 = rebind(o.foo, {x:2});
    var f2 = rebind(f1, {x:3});

    it('rebind() width {x:2}', function () {
        assert.equal(f1(1,1), 4)
    });

    it('rebind() width {x:3}', function () {
        assert.equal(f2(1,1), 5)
    });
});

describe('Function accumulator', function () {

    it('add(1).add(2).add(3).add(4) + 5 === 15', function () {
        assert.equal(add(1).add(2).add(3).add(4) + 5, 15)
    });

    it('add(1).add(2) + 1 === 4', function () {
        assert.equal(add(1).add(2) + 1, 4)
    });

    it('(add(1).add(2)).add(1).add(2) + 1 === 7', function () {
        assert.equal((add(1).add(2)).add(1).add(2) + 1, 7)
    });
});