import type { Abs, Add, IsNegative, NTuple, NumericalGtE, Range, Sub } from "./base";

({
	NTuple: checks(
		check<NTuple<10>["length"], 10>(),
		check<NTuple<100>["length"], 100>(),
		check<NTuple<10>[number], unknown>(),
		check<NTuple<10, 1>[number], 1>(),
		check<NTuple<10, boolean>[number], boolean>(),
		check<NTuple<-1>, number[]>(),
		check<NTuple<0>, []>(),
		check<NTuple<never>, []>(),
		check<NTuple<number>, number[]>(),
		check<NTuple<any>, number[]>()
	),
	IsNegative: checks(
		check<IsNegative<-1>, true>(),
		check<IsNegative<-100000000000000>, true>(),
		check<IsNegative<100000000000000>, false>(),
		check<IsNegative<3>, false>()
	),
	Abs: checks(
		check<Abs<-1>, 1>(),
		check<Abs<-100>, 100>(),
		check<Abs<100>, 100>(),
		check<Abs<100>, 100>()
	),
	Range: checks(
		check<Range<1, false>, 0>(),
		check<Range<1, true>, 0 | 1>(),
		check<Range<3, true>, 0 | 1 | 2 | 3>()
	),
	Add: checks(
		check<Add<1, 1>, 2>(),
		check<Add<1, number>, number>(),
		check<Add<120, 100>, 220>(),
		check<Add<-1, 100>, number>()
	),
	Sub: checks(
		check<Sub<1, 1>, 0>(),
		check<Sub<0, 1>, never>(),
		check<Sub<100, 54>, 46>(),
		check<Sub<100, -1>, number>(),
		check<Sub<-1, 100>, never>()
	),
	GtE: checks(
		check<NumericalGtE<1, 1>, true>(),
		check<NumericalGtE<10, 1>, true>(),
		check<NumericalGtE<1, 10>, false>()
	),
});
