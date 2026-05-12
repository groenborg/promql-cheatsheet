import type { Section } from "../types";

export const section: Section = {
	id: "selectors",
	number: "02",
	title: "Selectors & matchers",
	subtitle: "Picking the series you want",
	cards: [
		{
			title: "By metric name",
			keys: "metric name",
			badge: "basic",
			description: "The bare name selects every series that shares it.",
			code: `node_cpu_seconds_total`,
		},
		{
			title: "Label equals <code>=</code>",
			titleHtml: true,
			keys: "equals label match",
			badge: "basic",
			description:
				"Exact string match. Most common matcher in everyday queries.",
			code: `http_requests_total{job="api", method="GET"}`,
		},
		{
			title: "Not equal <code>!=</code>",
			titleHtml: true,
			keys: "not equal label",
			badge: "basic",
			description:
				"Exclude a label value. Useful for filtering out a noisy instance or status.",
			code: `http_requests_total{status!="200"}`,
		},
		{
			title: "Regex match <code>=~</code>",
			titleHtml: true,
			keys: "regex match",
			badge: "basic",
			description:
				"RE2 regex, fully anchored automatically. Great for OR-ing several values.",
			code: `http_requests_total{status=~"5.."}
up{job=~"api|web|worker"}`,
		},
		{
			title: "Negative regex <code>!~</code>",
			titleHtml: true,
			keys: "negative regex",
			badge: "advanced",
			description: "Series whose label does <em>not</em> match the pattern.",
			code: `requests_total{path!~"/health.*"}`,
		},
		{
			title: "Match a missing label",
			keys: "empty label absent",
			badge: "advanced",
			description:
				"An empty string matches series where the label is unset. Pair with <code>=</code> or <code>!=</code>.",
			code: `# series WITHOUT an env label
up{env=""}

# series that DO have one
up{env!=""}`,
		},
		{
			title: "Match metric name as a label",
			keys: "metric name regex __name__",
			badge: "advanced",
			description:
				"The metric name lives in the special <code>__name__</code> label, so you can regex-match it too.",
			code: `{__name__=~"node_cpu_.*", cpu="0"}`,
		},
		{
			title: "Offset",
			keys: "offset modifier",
			badge: "advanced",
			description:
				"Shifts the evaluation time backward. <code>@</code> pins it to a Unix timestamp.",
			code: `http_requests_total offset 5m

# pin to a specific moment
http_requests_total @ 1672531200`,
		},
	],
};
