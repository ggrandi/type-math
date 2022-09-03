import type { NTuple, ToNum } from "./base";
import type { MultiplyAll } from "./Multiply";
import type { Numeric } from "./NumberComparison";

/** @returns `N ^ E` */
export type Exponent<N extends Numeric, E extends Numeric> = MultiplyAll<NTuple<ToNum<E>, N>>;
