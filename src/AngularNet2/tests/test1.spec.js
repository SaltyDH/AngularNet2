//import {describe, it, expect} from 'jasmine';
var HelloWorld = (function () {
    function HelloWorld() {
    }
    HelloWorld.prototype.helloWorld = function () {
        return "Hello World!";
    };
    return HelloWorld;
})();
describe("Hello world", function () {
    it("says hello", function () {
        var hello = new HelloWorld();
        expect(hello.helloWorld()).toEqual("Hello World!");
    });
});

//# sourceMappingURL=../maps/test1.spec.js.map
