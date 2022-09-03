import type { Numeric } from "./NumberComparison";

export type ToNum<T extends Numeric> = `${T}` extends `${infer N extends number}` ? N : never;

export type NTuple<
	Length extends number,
	Type extends unknown = unknown,
	Res extends unknown[] = []
> = [Length] extends [never]
	? []
	: number extends Length
	? number[]
	: IsNegative<Length> extends true
	? number[]
	: Res["length"] extends Length
	? Res
	: [...Res, Type]["length"] extends Length
	? [...Res, Type]
	: NTuple<Length, Type, [...Res, Type, Type]>;

/** @returns whether the value is negative */
export type IsNegative<N extends Numeric> = `${N}` extends `-${number}` ? true : false;

/** @returns `|X|` */
export type Abs<N extends Numeric> = IsNegative<N> extends true
	? `${N}` extends `-${infer Num extends number}`
		? Num
		: number
	: N;

export type Range<
	End extends number,
	Inclusive extends boolean,
	Res extends number[] = []
> = number extends End
	? never
	: Res["length"] extends End
	? Res[number] | (Inclusive extends true ? Res["length"] : never)
	: Range<End, Inclusive, [...Res, Res["length"]]>;

/** @internal */
export type Add<A extends number, B extends number> = number extends A | B
	? number
	: [...NTuple<A>, ...NTuple<B>]["length"];
/** @internal */
export type Sub<A extends number, B extends number> = number extends A | B
	? number
	: NTuple<A> extends [...NTuple<B>, ...infer Rest]
	? Rest["length"]
	: never;

/** @internal */
export type NumericalGtE<A extends number, B extends number> = [Sub<A, B>] extends [never]
	? false
	: true;
