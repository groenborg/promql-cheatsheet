/* One-pager content. Each section is a discrete block authored against the
   print layout's compact .kv table + .item structure. Code blocks use the
   hand-spanned approach (light fill, accent left border) — not Shiki. */

export interface KvRow {
	key: string;
	value: string;
}

export interface Item {
	label?: string; // allows inline <code>, <span class="pill adv">
	desc?: string; // allows inline <code>, <strong>
	/** Raw HTML for the <pre> body, including <span class="c|k|a">…</span> spans. */
	code?: string;
}

export type Block =
	| { type: "intro"; text: string }
	| { type: "kv"; rows: KvRow[] }
	| { type: "item"; item: Item };

export interface OnePagerSection {
	number: string;
	title: string; // allows inline pill (<span class="pill adv">adv</span>)
	blocks: Block[];
}

export const sections: OnePagerSection[] = [
	{
		number: "01",
		title: "Data types",
		blocks: [
			{
				type: "kv",
				rows: [
					{
						key: "name",
						value: 'instant vector — one sample per series, "now"',
					},
					{ key: "name[5m]", value: "range vector — window of samples" },
					{ key: "3.14", value: "scalar — single number" },
					{ key: '"foo"', value: "string — only as fn arg" },
				],
			},
		],
	},
	{
		number: "02",
		title: "Selectors &amp; matchers",
		blocks: [
			{
				type: "kv",
				rows: [
					{ key: '{job="api"}', value: "exact match" },
					{ key: '{status!="200"}', value: "not equal" },
					{ key: '{status=~"5.."}', value: "regex (RE2, anchored)" },
					{ key: '{path!~"/health.*"}', value: "negative regex" },
					{ key: '{env=""}', value: "label not present" },
					{ key: '{env!=""}', value: "label present" },
					{ key: '{__name__=~"node_.*"}', value: "regex on metric name" },
					{ key: "x offset 5m", value: "shift evaluation back 5m" },
					{ key: "x @ 1672531200", value: "pin to Unix timestamp" },
				],
			},
		],
	},
	{
		number: "03",
		title: "Time &amp; durations",
		blocks: [
			{
				type: "item",
				item: {
					label: "Units (chained, biggest first):",
					desc: "<code>ms · s · m · h · d · w · y</code>",
				},
			},
			{
				type: "kv",
				rows: [
					{ key: "5m", value: "5 minutes" },
					{ key: "1h30m", value: "90 minutes" },
					{ key: "1y2w", value: "1 year 2 weeks" },
				],
			},
			{
				type: "item",
				item: {
					label: 'Subquery <span class="pill adv">adv</span>',
					desc: "<code>[range:resolution]</code> — instant expr over range",
					code: `<span class="k">max_over_time</span>(\n  rate(req[5m])[1h:1m]\n)`,
				},
			},
		],
	},
	{
		number: "04",
		title: "Aggregation",
		blocks: [
			{
				type: "intro",
				text: "Pattern: <code>op by (labels) (expr)</code> — or <code>without (...)</code> to drop instead of keep.",
			},
			{
				type: "kv",
				rows: [
					{ key: "sum", value: "add across series" },
					{ key: "avg", value: "mean across series" },
					{ key: "min / max", value: "lowest / highest" },
					{ key: "count", value: "number of series in group" },
					{ key: "count_values", value: "histogram of values" },
					{
						key: 'topk(k, …) <span class="pill adv">adv</span>',
						value: "k highest, keeps labels",
					},
					{
						key: 'bottomk(k, …) <span class="pill adv">adv</span>',
						value: "k lowest",
					},
					{
						key: 'quantile(φ, …) <span class="pill adv">adv</span>',
						value: "φ-quantile across series",
					},
					{
						key: 'stddev / stdvar <span class="pill adv">adv</span>',
						value: "spread across series",
					},
					{
						key: 'group <span class="pill adv">adv</span>',
						value: "constant 1 per group",
					},
				],
			},
		],
	},
	{
		number: "05",
		title: "Counter functions",
		blocks: [
			{
				type: "item",
				item: {
					label: "<code>rate(v[5m])</code>",
					desc: "per-sec average rate; reset-aware. <strong>Default for graphs &amp; alerts.</strong>",
				},
			},
			{
				type: "item",
				item: {
					label: '<code>irate(v[1m])</code> <span class="pill adv">adv</span>',
					desc: "last-2-samples rate; reactive but spiky.",
				},
			},
			{
				type: "item",
				item: {
					label: "<code>increase(v[1h])</code>",
					desc: "total increase in window (extrapolated).",
				},
			},
			{
				type: "item",
				item: {
					label: '<code>resets(v[1h])</code> <span class="pill adv">adv</span>',
					desc: "counter reset count.",
				},
			},
		],
	},
	{
		number: "05b",
		title: "Gauge functions",
		blocks: [
			{
				type: "item",
				item: {
					label: "<code>delta(v[2h])</code>",
					desc: "first→last difference of a gauge.",
				},
			},
			{
				type: "item",
				item: {
					label: "<code>deriv(v[1h])</code>",
					desc: "per-sec derivative (linear regression).",
				},
			},
			{
				type: "item",
				item: {
					label:
						'<code>predict_linear(v[1h], t)</code> <span class="pill adv">adv</span>',
					desc: "predicted value t seconds from now.",
					code: `<span class="k">predict_linear</span>(\n  fs_avail[1h], 4*3600\n) &lt; 0   <span class="c"># disk full in 4h</span>`,
				},
			},
			{
				type: "item",
				item: {
					label:
						'<code>changes(v[1h])</code> <span class="pill adv">adv</span>',
					desc: "value-change count.",
				},
			},
		],
	},
	{
		number: "05c",
		title: "*_over_time",
		blocks: [
			{
				type: "intro",
				text: "Aggregate a range vector along the <strong>time axis</strong>, per series.",
			},
			{
				type: "kv",
				rows: [
					{ key: "avg_over_time", value: "mean of samples" },
					{ key: "min/max_over_time", value: "extremes in window" },
					{ key: "sum_over_time", value: "sum of samples" },
					{ key: "count_over_time", value: "sample count" },
					{ key: "last_over_time", value: "most recent sample" },
					{ key: "quantile_over_time", value: "φ-quantile per series" },
					{ key: "stddev_over_time", value: "std-dev per series" },
				],
			},
		],
	},
	{
		number: "05d",
		title: 'Histograms <span class="pill adv">adv</span>',
		blocks: [
			{
				type: "item",
				item: {
					label: "<code>histogram_quantile(φ, b)</code>",
					desc: "φ-quantile from classic <code>_bucket</code> series; keep <code>le</code>.",
					code: `<span class="k">histogram_quantile</span>(0.95,\n  sum by (<span class="a">le</span>, job)(\n    rate(req_bucket[5m])\n  ))`,
				},
			},
		],
	},
	{
		number: "05e",
		title: "Labels &amp; misc",
		blocks: [
			{
				type: "item",
				item: {
					label:
						'<code>label_replace(v, dst, repl, src, rx)</code> <span class="pill adv">adv</span>',
					desc: "rewrite label via regex.",
				},
			},
			{
				type: "item",
				item: {
					label:
						'<code>label_join(v, dst, sep, …)</code> <span class="pill adv">adv</span>',
					desc: "concat labels into a new one.",
				},
			},
			{
				type: "item",
				item: {
					label: "<code>absent(v)</code> · <code>absent_over_time</code>",
					desc: '→ 1 when no series — for "stopped reporting" alerts.',
				},
			},
			{
				type: "item",
				item: {
					label: "<code>clamp / clamp_min / clamp_max</code>",
					desc: "squeeze values into a range.",
				},
			},
			{
				type: "item",
				item: {
					label: "<code>vector(s)</code> · <code>scalar(v)</code>",
					desc: "bridge scalar ↔ vector.",
				},
			},
			{
				type: "item",
				item: { label: "<code>time()</code>", desc: "unix sec at evaluation." },
			},
			{
				type: "item",
				item: {
					label: "<code>sort / sort_desc</code>",
					desc: "order results in tables.",
				},
			},
		],
	},
	{
		number: "05f",
		title: "Binary ops &amp; matching",
		blocks: [
			{
				type: "kv",
				rows: [
					{ key: "+ - * / % ^", value: "arithmetic, label-matched" },
					{
						key: "== != &gt; &lt; &gt;= &lt;=",
						value: "filter (use <code>bool</code> for 1/0)",
					},
					{ key: "and / or / unless", value: "set ops on label sets" },
					{ key: "on(l...)", value: "match only on these labels" },
					{ key: "ignoring(l...)", value: "match on all but these" },
					{ key: "group_left / group_right", value: "many-to-one join" },
				],
			},
			{
				type: "item",
				item: {
					code: `requests / <span class="k">ignoring</span>(code)\n  <span class="k">group_left</span> requests_total`,
				},
			},
		],
	},
	{
		number: "06",
		title: "Gotchas",
		blocks: [
			{
				type: "item",
				item: {
					label: "rate inside sum, never outside.",
					desc: "Aggregating counters first hides resets → garbage.",
				},
			},
			{
				type: "item",
				item: {
					label: "Window ≥ 4× scrape interval.",
					desc: "rate/increase need ≥ 2 samples; <code>[5m]</code> is the safe default.",
				},
			},
			{
				type: "item",
				item: {
					label: "increase() can be fractional.",
					desc: "extrapolation to window edges; expected.",
				},
			},
			{
				type: "item",
				item: {
					label: "Match function to metric type.",
					desc: "rate/irate/increase → counter. delta/deriv/predict_linear → gauge.",
				},
			},
			{
				type: "item",
				item: {
					label: "Keep <code>le</code> for histograms.",
					desc: "<code>sum by (le, …)</code> — never drop it.",
				},
			},
			{
				type: "item",
				item: {
					label: "Watch cardinality.",
					desc: "user IDs, paths, trace IDs as labels = pain.",
				},
			},
			{
				type: "item",
				item: {
					label: "Subqueries are expensive.",
					desc: "prefer recording rules for hot paths.",
				},
			},
			{
				type: "item",
				item: {
					label: "Empty result from <code>a / b</code>?",
					desc: `label sets don't line up. Use <code>on()</code>/<code>ignoring()</code>.`,
				},
			},
		],
	},
	{
		number: "07",
		title: "Quick recipes",
		blocks: [
			{
				type: "item",
				item: {
					label: "Error rate %",
					code: `sum(rate(req{code=~"5.."}[5m]))\n/ sum(rate(req[5m])) * 100`,
				},
			},
			{
				type: "item",
				item: {
					label: "CPU usage %",
					code: `100 - avg by(instance)(\n  rate(node_cpu_seconds_total\n    {mode="idle"}[5m])) * 100`,
				},
			},
			{
				type: "item",
				item: {
					label: "P95 latency",
					code: `histogram_quantile(0.95,\n  sum by(le)(\n    rate(http_dur_bucket[5m])))`,
				},
			},
			{
				type: "item",
				item: {
					label: '"Job is down" alert',
					code: `up{job="api"} == 0\n  or absent(up{job="api"})`,
				},
			},
		],
	},
];
