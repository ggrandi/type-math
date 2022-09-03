import type { Exponent } from "./Exponent";

checks(
	check<Exponent<2, 5>, 32>(),
	check<Exponent<-2, 5>, -32>(),
	check<Exponent<100, 2>, 10000>(),
	check<Exponent<10, 9>, 1000000000>()
);
