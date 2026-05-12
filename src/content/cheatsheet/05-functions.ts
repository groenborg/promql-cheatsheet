import type { Section } from "../types";

export const section: Section = {
	id: "functions",
	number: "05",
	title: "Functions",
	subtitle: `The workhorses, ordered roughly by how often you'll reach for them`,
	tall: true,
	cards: [
		{
			title: "<code>rate(v range)</code>",
			titleHtml: true,
			keys: "rate counter",
			badge: "basic",
			description:
				"Per-second average rate of a counter over the window. Resets are handled automatically. Use this for graphs and alerts on counters.",
			code: `rate(http_requests_total[5m])`,
			note: "Window must contain at least 2 samples — make it ≥ 4× scrape interval.",
		},
		{
			title: "<code>irate(v range)</code>",
			titleHtml: true,
			keys: "irate instant rate",
			badge: "advanced",
			description:
				"Rate based on the <em>last two</em> samples only — reactive but spiky. Good for short-lived dashboards, bad for alerts.",
			code: `irate(http_requests_total[1m])`,
		},
		{
			title: "<code>increase(v range)</code>",
			titleHtml: true,
			keys: "increase counter delta",
			badge: "basic",
			description:
				"Total counter increase over the window. Equivalent to <code>rate × seconds</code>, but reads more naturally.",
			code: `increase(errors_total[1h])`,
		},
		{
			title: "<code>delta(v range)</code>",
			titleHtml: true,
			keys: "delta gauge",
			badge: "basic",
			description: `First-to-last difference for a <em>gauge</em>. Don't use on counters (use <code>increase</code>).`,
			code: `delta(cpu_temp_celsius[2h])`,
		},
		{
			title: "<code>histogram_quantile(φ, b)</code>",
			titleHtml: true,
			keys: "histogram quantile latency",
			badge: "advanced",
			description: `φ-quantile (0–1) from a classic histogram's <code>_bucket</code> series. Always pair with <code>rate</code> + a <code>sum by (le, …)</code>.`,
			code: `histogram_quantile(0.95,
  sum by (le, job) (
    rate(http_request_duration_seconds_bucket[5m])
  )
)`,
		},
		{
			title: "<code>predict_linear(v range, t)</code>",
			titleHtml: true,
			keys: "predict_linear forecast",
			badge: "advanced",
			description:
				"Linear regression — predicts the value <code>t</code> seconds from now. Classic disk-full alert.",
			code: `predict_linear(
  node_filesystem_avail_bytes[1h], 4 * 3600
) < 0`,
		},
		{
			title: "<code>*_over_time(v range)</code>",
			titleHtml: true,
			keys: "aggregation over time avg max min",
			badge: "basic",
			description:
				"Aggregate a range vector along the <em>time</em> axis (per series). Family includes <code>avg / min / max / sum / count / quantile / stddev / last</code>.",
			code: `avg_over_time(cpu_usage[10m])
max_over_time(queue_depth[1h])
last_over_time(build_info[24h])`,
		},
		{
			title: "<code>absent(v)</code> / <code>absent_over_time</code>",
			titleHtml: true,
			keys: "absent missing",
			badge: "advanced",
			description: `Returns 1 when the input has no series — perfect for "did this metric stop reporting?" alerts.`,
			code: `absent(up{job="api"})
absent_over_time(up{job="api"}[5m])`,
		},
		{
			title: "<code>changes</code> / <code>resets</code>",
			titleHtml: true,
			keys: "changes resets",
			badge: "advanced",
			description:
				"<code>changes</code> counts value changes (gauges); <code>resets</code> counts counter resets in the window.",
			code: `changes(leader_id[1h])
resets(process_start_time_seconds[1h])`,
		},
		{
			title: "<code>label_replace</code>",
			titleHtml: true,
			keys: "label_replace rewrite",
			badge: "advanced",
			description:
				"Rewrite a label using a regex on another label. Most common use: aligning labels for a join.",
			code: `label_replace(
  up, "host", "$1", "instance", "(.*):.*"
)`,
		},
		{
			title: "<code>label_join</code>",
			titleHtml: true,
			keys: "label_join",
			badge: "advanced",
			description:
				"Concatenate label values into a new label using a separator.",
			code: `label_join(up, "id", "/", "job", "instance")`,
		},
		{
			title: "<code>vector(s)</code> / <code>scalar(v)</code>",
			titleHtml: true,
			keys: "vector scalar conversion",
			badge: "advanced",
			description:
				"Bridge between scalar and vector worlds — useful in arithmetic against constants.",
			code: `vector(1)
scalar(sum(up))`,
		},
		{
			title: "<code>time()</code>",
			titleHtml: true,
			keys: "time clock now",
			badge: "advanced",
			description:
				"Unix timestamp (seconds) of the evaluation. Combine with <code>process_start_time_seconds</code> for uptime.",
			code: `time() - process_start_time_seconds`,
		},
		{
			title:
				"<code>clamp</code> / <code>clamp_min</code> / <code>clamp_max</code>",
			titleHtml: true,
			keys: "clamp clamp_max clamp_min",
			badge: "advanced",
			description:
				"Squeeze values into a range. Handy for sanitizing dashboards.",
			code: `clamp(cpu_pct, 0, 100)`,
		},
		{
			title: "<code>sort</code> / <code>sort_desc</code>",
			titleHtml: true,
			keys: "sort",
			badge: "basic",
			description:
				"Sort the result vector by sample value. Affects table view, not graphs.",
			code: `sort_desc(rate(errors_total[5m]))`,
		},
		{
			title: "Arithmetic & logic",
			keys: "binary operators arithmetic",
			badge: "basic",
			description:
				"Vectors line up by matching label sets. Use <code>on()</code>/<code>ignoring()</code> + <code>group_left/right</code> for many-to-one joins.",
			code: `requests{code="5xx"}
  / ignoring(code) group_left
requests`,
		},
	],
};
