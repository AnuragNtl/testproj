# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

- Moved the constants `TRIVAL_PARTITION_KEY`, `MAX_PARTITION_KEY_LENGTH` to a separate file, `config.js`.
    - This will externalize the configuration for `deterministicPartitionKey()`
    - Config, in future can also be loaded from environment variables.
- Added this condition in the beginning, to remove additional nesting:
```    
if (!event) {
    return config.TRIVIAL_PARTITION_KEY;
}

```
- Extracted hash generation of event into a new function `getHashFromEvent()`
    - This will subdivide it into smaller, reusable parts and make it more readable.
- Extracted literals to constants/configs
- Moved common hashing code to common function
- Alternatively, made the implementation composed of multiple transformations of candidate, by separately giving each granular transformation a single responsibility. [Link](dpk_alternate.js)
    - this will accomodate for future additions to these transformations. 

