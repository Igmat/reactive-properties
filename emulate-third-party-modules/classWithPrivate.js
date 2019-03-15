export class TestWithPrivate {
    numberOfRepeats = 1;
    textToRepeat = 'Hello World';
    #foo = () => {
        let result = '';
        for (let i = 0; i < this.numberOfRepeats; i++) {
            result += this.textToRepeat + '\n';
        }
        return result;
    }
    get result() {
        return `Repeat '${this.textToRepeat}' for ${this.numberOfRepeats} times.
            ${this.#foo()}`
    }
}