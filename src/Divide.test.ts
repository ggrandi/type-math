import type { Divide } from "./Divide";

checks(
	check<Divide<100, 15>, 6>(),
	check<Divide<100, 15>, 6>(),
	check<Divide<12, 3>, 4>(),
	check<Divide<213478, 2347>, 90>(),
	check<Divide<213478, -2347>, -90>()
);
