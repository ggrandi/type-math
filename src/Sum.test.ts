import type { Sum } from "./Sum";

checks(
	check<Sum<2, 3>, 5>(),
	check<Sum<"13", "21">, 34>(),
	check<Sum<"328", 7>, 335>(),
	check<Sum<1_000_000_000_000, "123">, 1000000000123>(),
	check<Sum<9999, 1>, 10000>(),
	check<Sum<4325234, 39532>, 4364766>(),
	check<Sum<728, 0>, 728>(),
	check<Sum<"0", 213>, 213>(),
	check<Sum<0, "0">, 0>(),
	check<Sum<2, "100">, 102>()
);
