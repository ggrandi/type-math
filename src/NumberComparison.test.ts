import type { GtE, Gt, LtE, Lt, Max, Min } from "./NumberComparison";

({
	GtE: checks(
		check<GtE<1_000_000, -1_000>, true>(),
		check<GtE<1_000_000, 1_000_000>, true>(),
		check<GtE<1_100, 1_000>, true>(),
		check<GtE<-1_100, -1_000>, false>(),
		check<GtE<1_000_000, "100000">, true>(),
		check<GtE<-1, 0>, false>()
	),
	Gt: checks(
		check<Gt<1_000_000, -1_000>, true>(),
		check<Gt<1_000_000, 1_000_000>, false>(),
		check<Gt<1_100, 1_000>, true>(),
		check<Gt<-1_100, -1_000>, false>(),
		check<Gt<1_000_000, "100000">, true>(),
		check<Gt<-1, 0>, false>()
	),
	LtE: checks(
		check<LtE<1_000_000, -1_000>, false>(),
		check<LtE<1_000_000, 1_000_000>, true>(),
		check<LtE<1_100, 1_000>, false>(),
		check<LtE<-1_100, -1_000>, true>(),
		check<LtE<1_000_000, "100000">, false>(),
		check<LtE<-1, 0>, true>()
	),
	Lt: checks(
		check<Lt<1_000_000, -1_000>, false>(),
		check<Lt<1_000_000, 1_000_000>, false>(),
		check<Lt<1_100, 1_000>, false>(),
		check<Lt<-1_100, -1_000>, true>(),
		check<Lt<1_000_000, "100000">, false>(),
		check<Lt<-1, 0>, true>()
	),
	//prettier-ignore
	Max: checks(
		check<Max<10000000, 1>,10000000>(),
		check<Max<-10000000, 1>,1>(),
	),
	//prettier-ignore
	Min: checks(
		check<Min<10000000, 1>,1>(),
		check<Min<-10000000, 1>,-10000000>(),
	),
});
