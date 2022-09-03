import type { M } from ".";

checks(
	check<M<1, "+", 1>, 2>(),
	check<M<1, "-", 1>, 0>(),
	check<M<1, "*", 1>, 1>(),
	check<M<1, "/", 1>, 1>(),
	check<M<1, "^", 1>, 1>(),
	check<M<1, "%", 1>, 0>(),
	check<M<1, "<", 1>, false>(),
	check<M<1, "<=", 1>, true>(),
	check<M<1, ">", 1>, false>(),
	check<M<1, ">=", 1>, true>(),
	check<M<1, "=", 1>, true>()
);
