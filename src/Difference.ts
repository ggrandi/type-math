import type { And, Equal, Or } from "./logic";
import type { Abs, IsNegative, ToNum } from "./base";
import type { Multiply } from "./Multiply";
import type { Digit, Gt, Numeric } from "./NumberComparison";
import type { Join, StrToChars } from "./string";
import type { PadToSameLength } from "./Sum";

export type Difference<A extends Numeric, B extends Numeric> = Equal<`${A}`, `${B}`> extends true
	? 0
	: // if both numbers are negative
	And<IsNegative<A> | IsNegative<B>> extends true
	? // multiplies the absolute values
	  Multiply<Abs<A>, Abs<B>>
	: // if only one is negative
	Or<IsNegative<A> | IsNegative<B>> extends true
	? // multiplies the absolute values and flips it
	  Opposite<Multiply<Abs<A>, Abs<B>>>
	: Gt<B, A> extends true
	? Difference<B, A> extends infer D extends Numeric
		? Opposite<D>
		: never
	: PadToSameLength<StrToChars<`${A}`>, StrToChars<`${B}`>, "0"> extends [
			infer AChars extends [Digit, ...Digit[]],
			infer BChars extends [Digit, ...Digit[]]
	  ]
	? Join<
			TrimLeftArray<DifferenceHelper<AChars, BChars>, "0">,
			""
	  > extends infer N extends `${number}`
		? ToNum<N>
		: never
	: never;

type DifferenceHelper<A extends Digit[], B extends Digit[]> = [A, B] extends [
	[...infer RestA extends Digit[], infer NextA extends Digit],
	[...infer RestB extends Digit[], infer NextB extends Digit]
]
	? SubtractionTable[NextA][NextB] extends [
			infer Value extends number,
			infer ShouldCarry extends boolean
	  ]
		? ShouldCarry extends true
			? [...DifferenceHelper<MinusOneDigits<RestA>, RestB>, `${Value}`]
			: [...DifferenceHelper<RestA, RestB>, `${Value}`]
		: never
	: [];

export type Opposite<N extends Numeric> = `${N}` extends `-${infer Abs extends number}`
	? Abs
	: `-${N}` extends `${infer M extends number}`
	? M
	: never;

export type TrimLeftArray<A extends unknown[], TTrim> = A extends [TTrim, ...infer RestA]
	? TrimLeftArray<RestA, TTrim>
	: A;

type MinusOneTable = [never, "0", "1", "2", "3", "4", "5", "6", "7", "8"];

export type MinusOneDigits<D extends Digit[]> = D extends [
	...infer Rest extends Digit[],
	infer Next extends Digit
]
	? Next extends "0"
		? [...MinusOneDigits<Rest>, "9"]
		: [...Rest, MinusOneTable[Next]]
	: [];

/**
 * ```
 * console.log(
 * 	`//prettier-ignore\nexport type SubtractionTable = [\n${Array.from(
 * 		{ length: 10 },
 * 		(_, n) =>
 * 			`\t[${Array.from({ length: 10 }, (_, i) =>
 * 				n - i < 0 ? `[${n - i + 10},  true]` : `[${n - i}, false]`
 * 			).join(", ")}]`
 * 	).join(",\n")}\n]`
 * );
 * ```
 * as `SubtractionTable[Digit][Digit] = [value: number, overflow: boolean]`
 */
//prettier-ignore
type SubtractionTable = [
	[[0, false], [9,  true], [8,  true], [7,  true], [6,  true], [5,  true], [4,  true], [3,  true], [2,  true], [1,  true]],
	[[1, false], [0, false], [9,  true], [8,  true], [7,  true], [6,  true], [5,  true], [4,  true], [3,  true], [2,  true]],
	[[2, false], [1, false], [0, false], [9,  true], [8,  true], [7,  true], [6,  true], [5,  true], [4,  true], [3,  true]],
	[[3, false], [2, false], [1, false], [0, false], [9,  true], [8,  true], [7,  true], [6,  true], [5,  true], [4,  true]],
	[[4, false], [3, false], [2, false], [1, false], [0, false], [9,  true], [8,  true], [7,  true], [6,  true], [5,  true]],
	[[5, false], [4, false], [3, false], [2, false], [1, false], [0, false], [9,  true], [8,  true], [7,  true], [6,  true]],
	[[6, false], [5, false], [4, false], [3, false], [2, false], [1, false], [0, false], [9,  true], [8,  true], [7,  true]],
	[[7, false], [6, false], [5, false], [4, false], [3, false], [2, false], [1, false], [0, false], [9,  true], [8,  true]],
	[[8, false], [7, false], [6, false], [5, false], [4, false], [3, false], [2, false], [1, false], [0, false], [9,  true]],
	[[9, false], [8, false], [7, false], [6, false], [5, false], [4, false], [3, false], [2, false], [1, false], [0, false]]
]
