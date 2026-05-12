import type { Section } from "../types";

export const section: Section = {
	id: "aggregation",
	number: "04",
	title: "Aggregation operators",
	subtitle: "Roll up an instant vector across series",
	cards: [
		{
			title: "<code>sum</code>",
			titleHtml: true,
			keys: "sum total",
			badge: "basic",
			description:
				"Add values across series. Almost always combined with <code>by</code> or <code>without</code>.",
			code: `sum by (job) (http_requests_total)`,
		},
		{
			title: "<code>avg</code>",
			titleHtml: true,
			keys: "avg average",
			badge: "basic",
			code: `avg by (instance) (node_load1)`,
		},
		{
			title: "<code>min</code> / <code>max</code>",
			titleHtml: true,
			keys: "min max",
			badge: "basic",
			code: `max by (job) (up)`,
		},
		{
			title: "<code>count</code>",
			titleHtml: true,
			keys: "count series",
			badge: "basic",
			description:
				"Number of series in each group. Use <code>count_values</code> for value buckets.",
			code: `count by (job) (up == 1)`,
		},
		{
			title: "<code>by</code> vs <code>without</code>",
			titleHtml: true,
			keys: "by without grouping",
			badge: "basic",
			description:
				"<code>by</code> keeps only listed labels; <code>without</code> drops them and keeps the rest. Pick whichever is shorter to type.",
			code: `sum by (code) (requests)
sum without (instance, pod) (requests)`,
		},
		{
			title: "<code>topk</code> / <code>bottomk</code>",
			titleHtml: true,
			keys: "topk bottomk",
			badge: "advanced",
			description:
				"K highest/lowest series per group — keeps labels, unlike <code>sum</code>.",
			code: `topk(5, rate(http_requests_total[5m]))`,
		},
		{
			title: "<code>quantile</code>",
			titleHtml: true,
			keys: "quantile percentile",
			badge: "advanced",
			description:
				"φ-quantile (0–1) <em>across series</em>. For histogram quantiles, see <code>histogram_quantile</code>.",
			code: `quantile by (job) (0.95, go_goroutines)`,
		},
		{
			title: "<code>stddev</code> / <code>stdvar</code>",
			titleHtml: true,
			keys: "stddev stdvar",
			badge: "advanced",
			description:
				"Population standard deviation / variance across series in each group.",
			code: `stddev by (cluster) (node_load1)`,
		},
		{
			title: "<code>group</code>",
			titleHtml: true,
			keys: "group label",
			badge: "advanced",
			description:
				"Returns a constant 1 per group — useful as a left side in many-to-one joins.",
			code: `group by (cluster, namespace) (kube_pod_info)`,
		},
	],
};
