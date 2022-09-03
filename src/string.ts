import type { Sub } from "./base";

export type LiteralInsertion = string | number | bigint | boolean | null | undefined;

export type StrToChars<
	TString extends string,
	Chars extends string[] = []
> = TString extends `${infer Char}${infer Rest}` ? StrToChars<Rest, [...Chars, Char]> : Chars;

/** @see Array.join */
export type Join<T extends LiteralInsertion[], D extends LiteralInsertion = ","> = T extends [
	infer Next extends LiteralInsertion,
	...infer Rest extends LiteralInsertion[]
]
	? Rest["length"] extends 0
		? Next
		: `${Next}${D}${Join<Rest, D>}`
	: "";

/** repeat the String S, N times */
export type NString<N extends number, S extends string> = number extends N
	? ""
	: N extends 0
	? ""
	: N extends 1
	? S
	: N extends 2
	? `${S}${S}`
	: N extends 3
	? `${S}${S}${S}`
	: N extends 4
	? `${S}${S}${S}${S}`
	: `${S}${S}${S}${S}${S}${NString<Sub<N, 5>, S>}`;

export type Split<T extends string, Sep extends string> = Sep extends ""
	? never
	: T extends `${infer Next}${Sep}${infer Rest}`
	? [Next, ...Split<Rest, Sep>]
	: [T];
