# reactive-properties

Test project that showcase `Proxy` usage for creating reactive properties.  
It's minimal implementation with ONLY reactive stuff (no memoization, async handling, etc.).  
Something like this is used in `Vue`, `MobX`, `$mol`, `Aurelia`, `MetaF` and probably some other libraries/frameworks.

Install dependencies (we need `Babel` to make `class-fields` work) via:
```
npm install
```
Run tests via:
```
npm test
```

Code in `index.js` emulates library/framework that provides reactive capabilities.  
Code in `emulate-third-party-modules` emulates some other end-user dependencies (it includes 2 different encapsulation approaches and one without encapsulation).  
Code in `index.spec.js` emulates usage of such reactive library with some other end-user dependencies. This type of code will be written by end-user.