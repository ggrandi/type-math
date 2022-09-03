import type { Difference, Opposite, TrimLeftArray } from "./Difference";
import type { And, Not, Or } from "./logic";
import type { Abs, IsNegative, ToNum } from "./base";
import type { Multiply } from "./Multiply";
import type { Digit, Numeric } from "./NumberComparison";
import type { Join, StrToChars } from "./string";

/** @returns `Math.floor(N / Div)` */
export type Divide<N extends Numeric, Div extends Numeric> =
	// if both numbers are negative
	And<IsNegative<N> | IsNegative<Div>> extends true
		? // multiplies the absolute values
		  Divide<Abs<N>, Abs<Div>>
		: // if only one is negative
		Or<IsNegative<N> | IsNegative<Div>> extends true
		? // multiplies the absolute values and flips it
		  Opposite<Divide<Abs<N>, Abs<Div>>>
		: // casts both as strings
		[`${N}`, `${Div}`] extends [infer N extends `${number}`, infer Div extends `${number}`]
		? // if division by 0, error
		  Div extends `0`
			? never
			: // if division by 1, return the number
			Div extends `1`
			? ToNum<N>
			: // turn N into digits
			StrToChars<N> extends infer NChars extends Digit[]
			? ToNum<Join<TrimLeftArray<DivideHelper<NChars, Div>, "0">, ""> & `${number}`>
			: never
		: never;

type ToUnknownValues<T extends unknown[]> = {
	[K in keyof T]: unknown;
} extends infer UArr extends unknown[]
	? UArr
	: never;

type DivideHelper<N extends Digit[], Div extends Numeric, Digits extends unknown[] = [unknown]> =
	// get the number of digits specified by `Digits`
	N extends [...Digits, ...infer Rest extends Digit[]]
		? N extends [...infer NextDigits extends Digit[], ...Rest]
			? // find the closest multiple of the number of digits
			  ClosestMultiple<Join<NextDigits, ""> & Numeric, Div> extends [
					infer Num extends `${number}`,
					infer Remainder extends `${number}`
			  ]
				? // if the number is 0, add an extra value to the Digits Array
				  Num extends "0"
					? ["0", ...DivideHelper<N, Div, [...Digits, unknown]>]
					: Remainder extends "0"
					? // if the remainder is 0, reset the digits array
					  [Num, ...DivideHelper<Rest, Div>]
					: // if the remainder is not 0, Add the remainder to the beginning of N,
					  // and make the Digits array Remainder["length"] + 1
					  [
							Num,
							...DivideHelper<
								[
									...(StrToChars<Remainder> extends infer Arr extends Digit[] ? Arr : never),
									...Rest
								],
								Div,
								[...ToUnknownValues<StrToChars<Remainder>>, unknown]
							>
					  ]
				: never
			: never
		: [];

type Digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/** equivalent of `Digits.map((_,k) => N - (Div * Digits[K]))` */
type MultiplesDifference<N extends Numeric, Div extends Numeric, D extends Numeric[] = Digits> = {
	[K in keyof D]: Difference<N, Multiply<Div, D[K]>>;
};

type ClosestMultiple<
	N extends Numeric,
	Div extends Numeric,
	Multiples extends Numeric[] = MultiplesDifference<N, Div>
> =
	// gets the last two values
	Multiples extends [
		...infer Rest extends Numeric[],
		infer Next extends Numeric,
		infer Prev extends Numeric
	]
		? // if there is a sign change, then that's the value we want
		  And<IsNegative<Prev> | Not<IsNegative<Next>>> extends true
			? // return the found value
			  [n: `${Rest["length"]}`, remainder: `${Next}`]
			: ClosestMultiple<N, Div, [...Rest, Next]>
		: [];
