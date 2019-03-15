const calculatedAtoms = [];

function markAsDirty(dependent) {
    dependent.isDirty = true;
    dependent.dependents.forEach(markAsDirty);
}
function unlinkDependencies(prevDependencies, atom) {
    prevDependencies
        .filter(dependency =>
            atom.dependencies.indexOf(dependency) === -1)
        .forEach(dependency =>
            dependency.dependents.splice(dependency.dependents.indexOf(atom), 1));
}
function linkToCalculated(atom) {
    if (calculatedAtoms.length > 0) {
        const caller = calculatedAtoms[calculatedAtoms.length - 1];
        if (caller.dependencies.indexOf(atom) === -1) caller.dependencies.push(atom);
        if (atom.dependents.indexOf(caller) === -1) atom.dependents.push(caller);
    }
}
function recalculate(atom, resultGetter) {
    calculatedAtoms.push(atom);
    const { dependencies } = atom;
    atom.dependencies = [];
    const result = resultGetter();
    unlinkDependencies(dependencies, atom);
    atom.value = result;
    atom.isDirty = false;
    calculatedAtoms.pop();
}
function getAllProperties(obj) {
    if (obj == null) return [];
    const result = [];
    // `Object.getOwnPropertyNames` doesn't list `Symbol`s
    // and we want to emulate `Symbol.private` behavior
    // so we don't call `Object.getOwnPropertySymbols`
    // and don't interact with properties defined with symbols
    // in any way
    result.push(...Object.getOwnPropertyNames(obj));
    result.push(...getAllProperties(Object.getPrototypeOf(obj)));

    return result;
}

export function observe(obj) {
    const objAtoms = {};
    getAllProperties(obj)
        .forEach(key => {
            const atom = {
                dependencies: [],
                dependents: [],
                isDirty: true,
            };
            recalculate(atom, () => obj[key])
            objAtoms[key] = atom;
        });

    return new Proxy(obj, {
        defineProperty(target, p, attributes) {
            if (typeof p === 'symbol') {
                // emulate Symbol.private behavior
                return Reflect.defineProperty(target, p, attributes);
            }
            const { value } = attributes;
            const atom = {
                dependencies: [],
                dependents: [],
                isDirty: false,
                value,
            };
            objAtoms[p] = atom;

            return Reflect.defineProperty(target, p, attributes);
        },

        get(target, p, receiver) {
            if (typeof p === 'symbol') {
                // emulate Symbol.private behavior
                return Reflect.get(target, p, receiver);
            }
            const atom = objAtoms[p];
            linkToCalculated(atom);
            recalculate(
                atom,
                () => Reflect.get(target, p, receiver),
            );

            return atom.value;
        },

        set(target, p, value, receiver) {
            if (typeof p === 'symbol') {
                // emulate Symbol.private behavior
                return Reflect.set(target, p, value, receiver)
            }
            const atom = objAtoms[p];
            const result = Reflect.set(target, p, value, receiver);
            markAsDirty(atom);

            return result;
        }
    });
}

export function autorun(fn) {
    const exec = () => {
        recalculate(atom, fn);
    };
    const atom = {
        dependencies: [],
        dependents: [],
        get isDirty() {
            return false;
        },
        set isDirty(val) {
            if (val) exec();
        },
        value: undefined,
    };

    return exec();
}