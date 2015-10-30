import {Component, Directive, View, bootstrap} from "angular2/angular2";
import {Dependency1} from "./dep1";

@Component({
    selector: "home"
})
@View({
    template: "<h1>Welcome to {{title}}</h1>"
})

export class Home {
    title: string;

    constructor() {
        this.title = "AngularNet2";
        const dep1 = new Dependency1("Test");
        console.log(dep1.title);
        dep1.title = "Test2";
        console.log(dep1.title);
    }
}

bootstrap(Home)
    .then(() => {
        console.log("Bootstrap Successful");
    }, err => {
        console.error(err);
    });