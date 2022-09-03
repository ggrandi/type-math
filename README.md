# Type-Math

thanks to [typescript 4.8](https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types), we can now do any math we want using string literals and then cast it back to a number

this enables many more possibilities for the actual calculations. For example:

```ts
import { M } from "type-math";

type T = M<1023904812930, "+", 13482194249>;
// => 1037387007179
```

which previously would never have been possible

## Usage

`type-math` supports all the following operations with the `M` type:

- Addition
- Subtraction
- Multiplication
- Exponentiation
- Division
- Modulo
- Greater Than
- Greater Than or Equal To
- Less Than
- Less Than or Equal To
- Equals
