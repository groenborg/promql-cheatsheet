import type { Section } from "../types";

export const section: Section = {
	id: "types",
	number: "01",
	title: "Data types",
	subtitle: "What every PromQL expression evaluates to",
	cards: [
		{
			title: "Instant vector",
			keys: "instant vector",
			badge: "basic",
			description:
				"A set of time series, each with a single sample at the evaluation timestamp. The most common return type.",
			code: `http_requests_total
# → one value per matching series, "now"`,
		},
		{
			title: "Range vector",
			keys: "range vector",
			badge: "basic",
			description: `Each series carries a window of samples. You can't graph one directly — feed it to <code>rate()</code>, <code>avg_over_time()</code>, etc.`,
			code: `http_requests_total[5m]
# → all samples in the last 5 minutes`,
		},
		{
			title: "Scalar",
			keys: "scalar number",
			badge: "basic",
			description:
				"A single floating-point number. Returned by literals and the <code>scalar()</code> function.",
			code: `3.14
scalar(sum(up))`,
		},
		{
			title: "String",
			keys: "string",
			badge: "basic",
			description: `Currently used only as function arguments. You can't query a string.`,
			code: `"five minutes"`,
		},
	],
};
