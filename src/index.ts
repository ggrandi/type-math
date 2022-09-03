import type { Numeric, Gt, GtE, Lt, LtE } from "./NumberComparison";
import type { Equal, Or, And } from "./logic";
import type { Multiply } from "./Multiply";
import type { IsNegative } from "./base";
import type { Difference, Opposite } from "./Difference";
import type { Sum } from "./Sum";
import type { Exponent } from "./Exponent";
import type { Divide } from "./Divide";
import type { Modulo } from "./Modulo";

type Operation = "+" | "-" | "*" | "^" | "/" | "%" | ">" | ">=" | "<" | "<=" | "=";

/**
 * the Math Type™
 * ```ts
 * type T = [
 *   M<1, "+", 1>, // => 2
 *   M<3000, "-", 1234>, // => 1766
 *   M<9876, "*", 1234>, // => 12186984
 *   M<1, ">=", 1>, // => true
 *   M<1, "<", 2>, // => true
 * ]
 * ```
 */
export type M<A extends Numeric, Op extends Operation, B extends Numeric> =
	//
	Op extends "="
		? Equal<A, B>
		: Op extends ">"
		? Gt<A, B>
		: Op extends ">="
		? GtE<A, B>
		: Op extends "<"
		? Lt<A, B>
		: Op extends "<="
		? LtE<A, B>
		: Op extends "*"
		? Multiply<A, B>
		: Op extends "^"
		? Exponent<A, B>
		: Op extends "/"
		? Divide<A, B>
		: Op extends "%"
		? Modulo<A, B>
		: Op extends "+"
		? Or<IsNegative<A> | IsNegative<B>> extends true
			? // if both are negative, -(-A + -B)
			  And<IsNegative<A> | IsNegative<B>> extends true
				? Opposite<Sum<Opposite<A>, Opposite<B>>>
				: IsNegative<A> extends true
				? // if A is negative, B - -A
				  Difference<B, Opposite<A>>
				: // if B is negative, A - -B
				  Difference<A, Opposite<B>>
			: Sum<A, B>
		: Op extends "-"
		? Or<IsNegative<A> | IsNegative<B>> extends true
			? // if both are negative -(-A - -B)
			  And<IsNegative<A> | IsNegative<B>> extends true
				? Opposite<Difference<Opposite<A>, Opposite<B>>>
				: IsNegative<A> extends true
				? // if A is negative -(B + -A)
				  Opposite<Sum<B, Opposite<A>>>
				: // if B is negative A + -B
				  Sum<A, Opposite<B>>
			: Difference<A, B>
		: never;

export { M as TypeMath };

export type { Abs, IsNegative, ToNum } from "./base";
export type { And, Or, Not } from "./logic";
