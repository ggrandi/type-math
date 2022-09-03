import type { Difference } from "./Difference";

checks(
	check<Difference<4, 3>, 1>(),
	check<Difference<1000, 21>, 979>(),
	check<Difference<21, 1000>, -979>()
);
