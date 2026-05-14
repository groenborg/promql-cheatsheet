import type { APIRoute } from "astro";
import { cardSections, gotchaSection, tocEntries } from "~/content/cheatsheet";

export const GET: APIRoute = ({ site }) => {
	const base = site?.href.replace(/\/$/, "") ?? "https://promql.fyi";

	const sections = tocEntries
		.map((e) => {
			const match = [...cardSections, gotchaSection].find((s) => s.id === e.id);
			const subtitle = match?.subtitle ?? "";
			return `- [${e.label}](${base}/#${e.id})${subtitle ? ` — ${subtitle.replace(/<[^>]+>/g, "")}` : ""}`;
		})
		.join("\n");

	const body = `# PromQL Cheatsheet

> A modern reference for the Prometheus query language — types, selectors, operators, aggregations, functions, time syntax, and the gotchas you only learn at 3am.

The complete cheatsheet lives at ${base}/ as a single page. A printable A4 one-pager is at ${base}/one-pager.

## Sections

${sections}

## Full content

- [Full cheatsheet as markdown](${base}/llms-full.txt) — every section, card, and gotcha inlined for LLM ingestion.

## About

PromQL is the query language used by Prometheus and Prometheus-compatible time-series databases (Mimir, Thanos, VictoriaMetrics, Grafana Cloud). This site is a curated, opinionated reference focused on what practitioners actually need day-to-day.
`;

	return new Response(body, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
};
