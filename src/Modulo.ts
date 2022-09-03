import type { Difference } from "./Difference";
import type { Divide } from "./Divide";
import type { Multiply } from "./Multiply";
import type { Numeric } from "./NumberComparison";

/** @returns `A % B` */
export type Modulo<A extends Numeric, B extends Numeric> =
	// A - Math.floor(A / B) * B
	Difference<A, Multiply<Divide<A, B>, B>>;
