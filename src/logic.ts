/** @returns A === B */
export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
	? true
	: false;

/** @returns A extends B */
export type Extends<A, B> = [A] extends [B] ? true : false;

/** @returns `!X` */
export type Not<X extends boolean> = X extends true ? false : true;
/**
 * returns true if any passed in value is true
 * ```
 * type T = Or<true | false> // => true
 * type U = Or<true | true> // => true
 * type V = Or<false | false> // => false
 * type W = Or<false | false | false | false | false | false | false | false | true> // => true
 * ```
 */
export type Or<T extends boolean> = [true] extends [T] ? true : false;
/**
 * returns true if all passed in values are true
 * ```
 * type T = And<true | false> // => false
 * type U = And<true | true> // => true
 * type V = And<false | false> // => false
 * type W = And<true | true | true | true | true | true | true | true | true> // => true
 * ```
 */
export type And<T extends boolean> = [T] extends [true] ? true : false;

/**
 * A is exactly one of B
 * ```
 * type T = Is<null, [null, undefined]> // => true
 * type U = Is<undefined, [null, undefined]> // => true
 * type V = Is<any, [null, undefined]> // => false
 * ```
 */
export type Is<A, B extends readonly unknown[]> = Or<{ [K in keyof B]: Equal<A, B[K]> }[number]>;

/**
 * returns whether `T` is `any`
 */
export type IsAny<T> = Equal<T, any>;

/**
 * returns whether `T` is `never`
 */
export type IsNever<T> = Equal<T, never>;

/**
 * returns whether `T` is `unknown`
 */
export type IsUnknown<T> = Equal<T, unknown>;
