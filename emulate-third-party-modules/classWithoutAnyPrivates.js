export class TestWithoutAnyPrivates {
    numberOfRepeats = 1;
    textToRepeat = 'Hello World';
    foo() {
        let result = `Repeat '${this.textToRepeat}' for ${this.numberOfRepeats} times.`;
        result += '\n';
        for (let i = 0; i < this.numberOfRepeats; i++) {
            result += this.textToRepeat + '\n';
        }
        return result;
    }
    get result() {
        return this.foo();
    }
}