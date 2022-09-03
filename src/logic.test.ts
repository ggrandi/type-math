import type { And, Extends, Is, IsAny, IsNever, IsUnknown, Not, Or } from "./logic";

({
	Extends: checks(
		check<Extends<1, number>, true>(),
		check<Extends<boolean, true>, false>(),
		check<Extends<"" | "hello", string>, true>(),
		check<Extends<number, number>, true>(),
		check<Extends<never, unknown>, true>(),
		check<Extends<string, "">, false>()
	),
	Not: checks(check<Not<false>, true>(), check<Not<true>, false>()),
	Or: checks(
		check<Or<true>, true>(),
		check<Or<false | false | false | true>, true>(),
		check<Or<false | false>, false>()
	),
	And: checks(
		check<And<true | true>, true>(),
		check<And<true | true | false>, false>(),
		check<And<false>, false>()
	),
	IsUnknown: checks(
		check<IsUnknown<unknown>, true>(),
		check<IsUnknown<never>, false>(),
		check<IsUnknown<any>, false>()
	),
	IsNever: checks(
		check<IsNever<unknown>, false>(),
		check<IsNever<never>, true>(),
		check<IsNever<any>, false>()
	),
	IsAny: checks(
		check<IsAny<any>, true>(),
		check<IsAny<undefined>, false>(),
		check<IsAny<unknown>, false>(),
		check<IsAny<never>, false>(),
		check<IsAny<string>, false>(),
		check<IsAny<symbol>, false>(),
		check<IsAny<1>, false>()
	),
	Is: checks(
		check<Is<"Kars", ["Kars", "Esidisi", "Wamuu", "Santana"]>, true>(),
		check<Is<"Dio", ["Kars", "Esidisi", "Wamuu", "Santana"]>, false>(),
		check<Is<7, [1, 2, 3, 5, 6, 7]>, true>(),
		check<Is<4, [1, 2, 3, 5, 6, 7]>, false>(),
		check<Is<1, [1, 2, 3]>, true>(),
		check<Is<2, [1, 2, 3]>, true>(),
		check<Is<{ a: "A" }, [{}]>, false>(),
		check<Is<false, [boolean, 2, 3, 5, 6, 7]>, false>(),
		check<Is<boolean, [true, 2, 3, 5, 6, 7]>, false>(),
		check<Is<false, [false, 2, 3, 5, 6, 7]>, true>(),
		check<Is<{ readonly a: "A" }, [{ a: "A" }]>, false>(),
		check<Is<{ a: "A" }, [{ readonly a: "A" }]>, false>(),
		check<Is<1 | 2, [1]>, false>(),
		check<Is<1, [1 | 2]>, false>(),
		check<Is<undefined, [null]>, false>(),
		check<Is<null, [undefined]>, false>()
	),
});
