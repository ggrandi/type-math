import type { Multiply } from "./Multiply";

checks(
	check<Multiply<2, 3>, 6>(),
	check<Multiply<3, "5">, 15>(),
	check<Multiply<"4", 10>, 40>(),
	check<Multiply<0, 16>, 0>(),
	check<Multiply<"13", "21">, 273>(),
	check<Multiply<"43423", 321543>, 13962361689>(),
	check<Multiply<9999, 1>, 9999>(),
	check<Multiply<9999, -10>, -99990>(),
	check<Multiply<4325234, "39532">, 170985150488>(),
	check<Multiply<100_000, "1">, 100000>(),
	check<Multiply<259, 9125385>, 2363474715>(),
	check<Multiply<9, 99>, 891>(),
	check<Multiply<315, "100">, 31500>(),
	check<Multiply<11, 13>, 143>(),
	check<Multiply<728, 0>, 0>(),
	check<Multiply<1010101, 45>, 45454545>(),
	check<Multiply<"0", 213>, 0>(),
	check<Multiply<0, "0">, 0>()
);
