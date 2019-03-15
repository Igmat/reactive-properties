export function describe (name, cb) {
    console.group(name);
    cb();
    console.groupEnd(name);
}
export function it(name, cb) {
    try {
        cb();
        console.log('\x1b[32m', '\u2713', name, '\x1b[0m');
    } catch (e) {
        console.log('\x1b[31m', '\u2718', name, '\x1b[0m');
        console.group('');
        console.log(e.stack);
        console.groupEnd('');
    }
}