import type { Opposite } from "./Difference";
import type { And, Equal, Is, Or } from "./logic";
import type { Abs, IsNegative, ToNum } from "./base";
import type { Digit, Gt, Numeric } from "./NumberComparison";
import type { NString, StrToChars } from "./string";
import type { SumAll } from "./Sum";

/** Multiplies A and B together */
export type Multiply<A extends Numeric, B extends Numeric> =
	// if both numbers are negative
	And<IsNegative<A> | IsNegative<B>> extends true
		? // multiplies the absolute values
		  Multiply<Abs<A>, Abs<B>>
		: // if only one is negative
		Or<IsNegative<A> | IsNegative<B>> extends true
		? // multiplies the absolute values and flips it
		  Opposite<Multiply<Abs<A>, Abs<B>>>
		: // casts both A and B to numbers
		[`${A}`, `${B}`] extends [infer A extends `${number}`, infer B extends `${number}`]
		? // checks if either is 0
		  Is<"0", [A, B]> extends true
			? 0
			: // checks if either is 1 and returns the opposite
			Is<"1", [A, B]> extends true
			? Equal<A, "1"> extends true
				? ToNum<B>
				: ToNum<A>
			: // transforms them both into Digit[]
			[StrToChars<A>, StrToChars<B>] extends [
					infer AChars extends Digit[],
					infer BChars extends Digit[]
			  ]
			? // calls MultiplyHelper on the smaller number and casts it back to a number
			  ToNum<
					Gt<A, B> extends true ? MultiplyHelper<AChars, BChars> : MultiplyHelper<BChars, AChars>
			  >
			: never
		: never;

/** @internal */
type MultiplyHelper<
	Bigger extends Digit[],
	Smaller extends Digit[],
	R extends Numeric[] = []
> = Smaller extends [infer Next extends Digit, ...infer Rest extends Digit[]]
	? // multiplies the Bigger value by the next digit
	  MultiplyByDigit<Bigger, Next> extends infer N extends Numeric
		? MultiplyHelper<
				Bigger,
				Rest,
				[
					...R,
					// if the result is 0 doesn't add to the array
					...(N extends "0"
						? []
						: // if not pads the end with 0
						`${N}${NString<Rest["length"], "0">}` extends infer N extends Numeric
						? [N]
						: never)
				]
		  >
		: never
	: // sums all the results
	  SumAll<R>;

type MultiplyByDigit<N extends Digit[], D extends Digit, R extends Numeric[] = []> =
	// if the digit is 0, returns 0
	D extends "0"
		? "0"
		: N extends [infer Next extends Digit, ...infer Rest extends Digit[]]
		? // if the next digit is 0, goes to the next value
		  Next extends "0"
			? MultiplyByDigit<Rest, D, R>
			: // if not pads the result of the multiplication
			  MultiplyByDigit<Rest, D, [...R, `${TimesTable[D][Next]}${NString<Rest["length"], "0">}`]>
		: // sums all the results
		  SumAll<R>;

export type MultiplyAll<N extends Numeric[]> = N extends [
	infer Next extends Numeric,
	...infer Rest extends Numeric[]
]
	? Rest["length"] extends 0
		? Next
		: Multiply<Next, MultiplyAll<Rest>>
	: "1";

/**
 * produced by:
 * ```
 * console.log(
 * 	`//prettier-ignore\nexport type TimesTable = {\n${Array.from(
 * 		{ length: 10 },
 * 		(_, n) =>
 * 			`\t"${n}": { ${Array.from(
 * 				{ length: 10 },
 * 				(_, i) => `"${i}": ${(i * n).toString().padStart(Math.ceil(Math.log10(i * 9)), " ")}`
 * 			).join(", ")} }`
 * 	).join(",\n")}\n}`
 * );
 * ```
 * @internal
 */
//prettier-ignore
export type TimesTable = {
	"0": { "0": 0, "1": 0, "2":  0, "3":  0, "4":  0, "5":  0, "6":  0, "7":  0, "8":  0, "9":  0 },
	"1": { "0": 0, "1": 1, "2":  2, "3":  3, "4":  4, "5":  5, "6":  6, "7":  7, "8":  8, "9":  9 },
	"2": { "0": 0, "1": 2, "2":  4, "3":  6, "4":  8, "5": 10, "6": 12, "7": 14, "8": 16, "9": 18 },
	"3": { "0": 0, "1": 3, "2":  6, "3":  9, "4": 12, "5": 15, "6": 18, "7": 21, "8": 24, "9": 27 },
	"4": { "0": 0, "1": 4, "2":  8, "3": 12, "4": 16, "5": 20, "6": 24, "7": 28, "8": 32, "9": 36 },
	"5": { "0": 0, "1": 5, "2": 10, "3": 15, "4": 20, "5": 25, "6": 30, "7": 35, "8": 40, "9": 45 },
	"6": { "0": 0, "1": 6, "2": 12, "3": 18, "4": 24, "5": 30, "6": 36, "7": 42, "8": 48, "9": 54 },
	"7": { "0": 0, "1": 7, "2": 14, "3": 21, "4": 28, "5": 35, "6": 42, "7": 49, "8": 56, "9": 63 },
	"8": { "0": 0, "1": 8, "2": 16, "3": 24, "4": 32, "5": 40, "6": 48, "7": 56, "8": 64, "9": 72 },
	"9": { "0": 0, "1": 9, "2": 18, "3": 27, "4": 36, "5": 45, "6": 54, "7": 63, "8": 72, "9": 81 }
}
