---
title: "Порядок хранения/перечисления ключей в объекте JS"
date: "2021-07-14"
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
