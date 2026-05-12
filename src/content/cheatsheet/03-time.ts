import type { Section } from "../types";

export const section: Section = {
	id: "time",
	number: "03",
	title: "Time & duration syntax",
	subtitle: "Windows, ranges, and subqueries",
	cards: [
		{
			title: "Duration units",
			keys: "duration units",
			badge: "basic",
			description:
				"Combine integer + unit. Units can be chained, biggest first, no spaces.",
			code: `5m      # 5 minutes
1h30m   # 1.5 hours
7d      # 7 days
1y2w    # 1 year 2 weeks
# units: ms s m h d w y`,
		},
		{
			title: "Range vector window",
			keys: "range vector window",
			badge: "basic",
			description:
				"Square brackets after a selector capture all samples in that window.",
			code: `node_network_receive_bytes_total[5m]`,
		},
		{
			title: "Subquery",
			keys: "subquery",
			badge: "advanced",
			description:
				"<code>[range:resolution]</code> — evaluates an instant-vector expression over a range, like a recording rule on the fly. Resolution is optional.",
			code: `max_over_time(
  rate(http_requests_total[5m])[1h:1m]
)`,
			note: "<strong>Cost:</strong> subqueries re-evaluate the inner expression at each step. Prefer recording rules for hot paths.",
		},
		{
			title: "<code>@ start()</code> / <code>@ end()</code>",
			titleHtml: true,
			keys: "@ start end",
			badge: "advanced",
			description: `Pins evaluation to the start or end of the surrounding range query — handy for rendering "value at the moment of an alert".`,
			code: `http_requests_total @ start()`,
		},
	],
};
