// ============= Test Cases =============
import type { Add, NTuple, NumericalGtE, Sub, ToNum } from "./base";
import type { Digit, Numeric } from "./NumberComparison";
import type { StrToChars } from "./string";

// ============= Your Code Here =============
export type Sum<A extends Numeric, B extends Numeric> = PadToSameLength<
	StrToChars<`${B}`>,
	StrToChars<`${A}`>,
	"0"
> extends [infer AChars extends [Digit, ...Digit[]], infer BChars extends [Digit, ...Digit[]]]
	? SumHelper<AChars, BChars> extends infer N extends Numeric
		? ToNum<N>
		: never
	: never;

export type SumAll<N extends Numeric[]> = N extends [
	infer Next extends Numeric,
	...infer Rest extends Numeric[]
]
	? Rest["length"] extends 0
		? Next
		: Sum<Next, SumAll<Rest>>
	: "0";

type SumHelper<
	A extends Digit[],
	B extends Digit[],
	Carry extends boolean = false,
	R extends string = ""
> = [A, B] extends [
	[...infer RestA extends Digit[], infer NextA extends Digit],
	[...infer RestB extends Digit[], infer NextB extends Digit]
]
	? SumDigits<NextA, NextB, Carry> extends [infer D extends Digit, infer C extends boolean]
		? SumHelper<RestA, RestB, C, `${D}${R}`>
		: never
	: Carry extends true
	? `1${R}`
	: R;

/** @internal */
export type PadToSameLength<A extends unknown[], B extends unknown[], Pad> = NumericalGtE<
	A["length"],
	B["length"]
> extends true
	? [a: A, b: [...NTuple<Sub<A["length"], B["length"]>, Pad>, ...B]]
	: [a: [...NTuple<Sub<B["length"], A["length"]>, Pad>, ...A], b: B];

type SumDigits<A extends Digit, B extends Digit, Carry extends boolean = false> = `${Add<
	ToNum<A>,
	ToNum<B>
> extends infer R extends number
	? Carry extends false
		? R
		: Add<R, 1>
	: never}` extends `${infer First}${infer Rest}`
	? Rest extends ""
		? [digit: First, carry: false]
		: [digit: Rest, carry: true]
	: never;
