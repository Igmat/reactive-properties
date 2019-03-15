import { TestWithoutAnyPrivates } from './emulate-third-party-modules/classWithoutAnyPrivates';
import { TestWithPrivate } from './emulate-third-party-modules/classWithPrivate';
import { TestWithPrivateSymbol } from './emulate-third-party-modules/classWithPrivateSymbol';
import { autorun, observe } from './index';
import { describe, it } from './utilities/tester';

describe('Reactive properties', () => {
    it('Class without any privates', () => {
        const x = observe(new TestWithoutAnyPrivates());

        autorun(() => console.log(x.result));
        x.numberOfRepeats = 3;
        x.textToRepeat = 'Hi World!';
        x.numberOfRepeats = 2;
        x.numberOfRepeats = 5;
        x.textToRepeat = 'Hi';
    });
    it('Class with Symbol.private', () => {
        const x = observe(new TestWithPrivateSymbol());

        autorun(() => console.log(x.result));
        x.numberOfRepeats = 3;
        x.textToRepeat = 'Hi World!';
        x.numberOfRepeats = 2;
        x.numberOfRepeats = 5;
        x.textToRepeat = 'Hi';
    });
    it('Class with ES privates', () => {
        const x = observe(new TestWithPrivate());

        autorun(() => console.log(x.result));
        x.numberOfRepeats = 3;
        x.textToRepeat = 'Hi World!';
        x.numberOfRepeats = 2;
        x.numberOfRepeats = 5;
        x.textToRepeat = 'Hi';
    });
});