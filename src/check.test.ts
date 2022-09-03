declare function check<TA, TB>(): (<T>() => T extends TA ? 1 : 0) extends <T>() => T extends TB
	? 1
	: 0
	? "success"
	: {
			error: "types do not match";
			a: TA;
			b: TB;
	  };
declare function check<_T>(): "success";

declare function checks(...items: Array<"success">): void;
