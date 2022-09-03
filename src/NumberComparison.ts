import type { And, Equal, Not } from "./logic";
import type { IsNegative, NumericalGtE, Range, ToNum } from "./base";
import type { StrToChars } from "./string";

export type Numeric<T extends number | bigint = number> = T | `${T}`;
export type Digit = `${Range<9, true>}`;

export type GtE<A extends Numeric, B extends Numeric> =
	// turn A and B both into strings
	[`${A}`, `${B}`] extends [infer A extends `${number}`, infer B extends `${number}`]
		? // if they're equal, return true
		  Equal<A, B> extends true
			? true
			: // if a is negative and b is positive return false
			And<IsNegative<A> | Not<IsNegative<B>>> extends true
			? false
			: // if a is positive and b is negative return true
			And<Not<IsNegative<A>> | IsNegative<B>> extends true
			? true
			: And<IsNegative<A> | IsNegative<B>> extends true
			? // if both are negative, recurse with them both as positive and in opposite positions (A -> B, B -> A)
			  GtE<StringAbs<B>, StringAbs<A>>
			: StrToChars<`${A}`> extends infer AChars extends Digit[]
			? StrToChars<`${B}`> extends infer BChars extends Digit[]
				? // if the length is not equal, return the longer one
				  Not<Equal<AChars["length"], BChars["length"]>> extends true
					? NumericalGtE<AChars["length"], BChars["length"]>
					: // compare all the digits
					  GtDigits<AChars, BChars>
				: never
			: never
		: never;

type StringAbs<N extends `${number}`> = N extends `-${infer R}` ? R : N;

type GtDigits<A extends Digit[], B extends Digit[]> = [A, B] extends [
	[infer NextA extends Digit, ...infer RestA extends Digit[]],
	[infer NextB extends Digit, ...infer RestB extends Digit[]]
]
	? Equal<NextA, NextB> extends true
		? GtDigits<RestA, RestB>
		: NumericalGtE<ToNum<NextA>, ToNum<NextB>>
	: never;

export type Gt<A extends Numeric, B extends Numeric> = And<GtE<A, B> | Not<Equal<`${A}`, `${B}`>>>;

export type LtE<A extends Numeric, B extends Numeric> = Not<Gt<A, B>>;

export type Lt<A extends Numeric, B extends Numeric> = Not<GtE<A, B>>;

export type Max<A extends number, B extends number> = [GtE<A, B>] extends [true] ? A : B;
export type Min<A extends number, B extends number> = [Lt<A, B>] extends [true] ? A : B;
