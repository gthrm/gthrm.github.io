---
title: "Order of Storing/Enumerating Keys in a JS Object"
date: "2021-07-14"
lang: "eng"
type: "main"
description: "This article explores the order of storing and enumerating keys in JavaScript objects, a concept that gained predictability with ES6. It covers the sorting of integer keys, string keys, and symbol-named properties, and highlights the functions that respect this order, like Object.keys() and Reflect.ownKeys(). Understanding this order is vital for JavaScript developers dealing with object property iteration."
keywords: "JavaScript objects, key enumeration, ES6 features, object property order, integer keys, string keys, symbol properties, Object.keys, Object.getOwnPropertyNames, Object.getOwnPropertySymbols, Reflect.ownKeys, for-in loop, prototype chain enumeration, property sorting in JavaScript, JS object properties, ES6 object iteration, web development, JavaScript programming, coding standards, ES6 standards, JavaScript property order"
---

In JS, objects were 'unordered' until ES5. Starting from ES6, there is a predictable order of iterating through an object's properties.

1. All non-negative integer keys less than 2^32, in ascending order. (e.g., '1', '79', etc.). Typically, all valid array indexes. (non-negative numbers up to 2^32)

   > _Warning_: '05' will not be considered an integer key, as the integer parsed from it yields a different string representation.

2. All string keys in the order of insertion (in the order they were added to the object).

   > Here, numeric strings not falling within the first step and floating-point numbers will be covered.

3. Properties whose names are symbols are listed in the order in which they were added to the object.

If the enumeration order is relevant, you can always use Map, which guarantees that the insertion order will be preserved.

## Functions that enumerate properties in the order described above, taking into account their own limitations

- [`Object.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
- [`Object.getOwnPropertyNames()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)
- [`Object.getOwnPropertySymbols()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols)
- [`Reflect.ownKeys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys)

> Note that the enumeration order for the **for in** loop is not as strictly defined as for the above functions, but usually, the enumeration of own properties occurs in the order described above.

> Since the **for in** loop also enumerates properties in the prototype chain, after enumerating own properties, it will move _up the prototype chain_, enumerating the properties of each prototype object _in the same order as described above_.

> If a property has already been enumerated, any property with the same name will **not be** enumerated again.

> A property will **not be** enumerated, even if an enumerable property with the same name has already been considered.
