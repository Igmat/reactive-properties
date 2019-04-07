export class TestWithPrivate {
    numberOfRepeats = 1;
    textToRepeat = 'Hello World';
    #foo = function () {
        let result = `Repeat '${this.textToRepeat}' for ${this.numberOfRepeats} times.`;
        result += '\n';
        for (let i = 0; i < this.numberOfRepeats; i++) {
            result += this.textToRepeat + '\n';
        }
        return result;
    }
    get result() {
        return this.#foo();
    }
}