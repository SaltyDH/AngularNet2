//import {describe, it, expect} from 'jasmine';

class HelloWorld {
    helloWorld() {
        return "Hello World!";
    }
}
    
describe("Hello world", () => {
    it("says hello", () => {
        const hello = new HelloWorld();
        expect(hello.helloWorld()).toEqual("Hello World!");
    });
});