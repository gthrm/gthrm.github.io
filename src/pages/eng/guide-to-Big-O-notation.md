---
title: "Big O Notation Guide for Beginners"
date: "2020-09-27"
lang: "eng"
type: "main"
---

The **Big O notation** is used in computer science to describe the performance or complexity of an algorithm.
Big O specifically describes the *worst-case scenario*, and can be used to describe the time or space (e.g., in memory or on disk) required by an algorithm.

Anyone who has read *Programming Pearls* or any other computer science books without a strong mathematics background might hit a wall when they reach chapters mentioning O(N log N) or other seemingly arcane syntax.

This article aims to help you understand the basics of Big O and logarithms.

As a programmer first and a mathematician second (or maybe third or fourth), I've found that the best way to fully grasp Big O is to create some code examples. So below are some common practices, along with descriptions and examples where possible.

## O(1)

O(1) describes an algorithm that will always execute in the same time (or space) regardless of the size of the input data set.

```javascript
const nums = [1, 2, 3, 4, 5];
const firstNumber = nums[0];

```

In our example, the input size is 5 because there are 5 elements in the array. To get the result, one operation is required (fetching an element by index). How many operations are needed if there are 100, 1000, or 100,000 elements? Only one operation is still required.

## O(N)

O(N) describes an algorithm whose performance will grow linearly and in direct proportion to the size of the input data set.

The example below also demonstrates how Big O supports the worst-case performance scenario.

```javascript
const nums = [1, 2, 3, 4, 5];
let sum = 0;
for (let num of nums) {
  sum += num;
}
```

Again, the question is: how many input operations are required? Here, you need to iterate over each element, i.e., an operation for each element. The larger the array, the more operations.

Using Big O notation: O(n), or "complexity of order n." Such algorithms are also called "linear" or that the algorithm "scales linearly."

Can we make the sum more efficient? Generally no. But what if we know that the array starts with 1, is sorted, and has no gaps? Then we can apply the formula:

<img src="https://i.upmath.me/svg/S%20%3D%20%7Bn(n%2B1)%20%5Cover%202%7D." alt="S = {n(n+1) \over 2}." />

where n is the last element of the array.

```javascript
const sumContiguousArray = function (arr) {
  //get the last item
  const lastItem = arr[arr.length - 1];
  //Gauss's trick
  return (lastItem * (lastItem + 1)) / 2;
};
const nums = [1, 2, 3, 4, 5];
const sumOfArray = sumContiguousArray(nums);

```

## O(N^2)

O(N^2) represents an algorithm whose performance is directly proportional to the square of the size of the input data set. This is typical for algorithms that include nested iterations over the data set. Deeper nested iterations will lead to O(N^3), O(N^4), etc.

```javascript
const hasDuplicates = function (num) {
  //loop the list, our O(n) op
  for (let i = 0; i < nums.length; i++) {
    const thisNum = nums[i];
    //loop the list again, the O(n^2) op
    for (let j = 0; j < nums.length; j++) {
      //make sure we're not checking same number
      if (j !== i) {
        const otherNum = nums[j];
        //if there's an equal value, return
        if (otherNum === thisNum) return true;
      }
    }
  }
  //if we're here, no dups
  return false;
};
const nums = [1, 2, 3, 4, 5, 5];
hasDuplicates(nums); //true
```

Iterating an array is O(N).
But we have a nested loop, iterating again for each element – i.e., O(N^2) or "complexity of order n square."

Algorithms with nested loops over the same collection are always O(N^2).

## O(2^N)

O(2^N) denotes an algorithm whose growth doubles with each addition to the input data set. The growth curve of an O(2^N) function is exponential - starting off shallow and then steeply rising. An example of an O(2^N) function is the recursive calculation of Fibonacci numbers:

```javascript
const fibonacci = function (num) {
  if (num <= 1) {
    return num;
  }
  return fibonacci(num - 2) + fibonacci(num - 1);
};
fibonacci(5); //true

```

## O(log n)

**Example:**

[Binary Search](https://en.wikipedia.org/wiki/Binary_search) - this method is used for searching in sorted data sets. It works by selecting the middle element of the data set, essentially the median value, and comparing it to the target value. If the values match, it returns true. If the target value is higher than the probe element's value, it takes the upper half of the data set and performs the same operation with it. Likewise, if the target value is lower than the probe element's value, it performs the operation with the lower half. It continues to halve the data set with each iteration until the value is found or it can no longer divide the data set.

This type of algorithm is described as O(log N). Iterative halving of data sets, as described in the binary search example, yields a growth curve that peaks early and slowly levels out as the size of the data sets increases, e.g., a data set of 10 elements takes one second, a data set of 100 elements takes two seconds, and a data set containing 1000 elements takes three seconds. Doubling the size of the input data set has little effect on its growth, as after one iteration of the algorithm, the data set will be halved and, therefore, on par with a data set half its size. This makes algorithms like binary search extremely efficient when working with large data sets.

Such algorithms are called "Divide and Conquer."

In the "binary search" algorithm, we divide the array into two parts at each step.

In the worst case, we make as many operations/divisions as we can divide the array into two parts. For example, how many times can we divide an array of 4 elements into two parts? Twice. And an array of 8 elements? Three times. So, the number of divisions/operations = log2(n) (where n is the number of elements in the array).

**Conclusions:**

- Accessing an element of a collection is O(1). *Whether it's accessing by index in an array or by key in a dictionary, in Big O notation this is O(1)*.
- Iterating over a collection is O(n).
- Nested loops over the same collection are O(n^2).
- Divide and Conquer algorithms are always O(log n).
- Iterations that use Divide and Conquer are O(n log n).
