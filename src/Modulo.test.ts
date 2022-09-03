import type { Modulo } from "./Modulo";

checks(
	check<Modulo<500, 2>, 0>(),
	check<Modulo<100, 9>, 1>(),
	check<Modulo<21349127, 89012>, 75259>(),
	check<Modulo<3725897, 90>, 77>(),
	check<Modulo<1, 1>, 0>()
);
