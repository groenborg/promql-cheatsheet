import type { APIRoute } from "astro";
import { cardSections, gotchaCards, gotchaSection } from "~/content/cheatsheet";
import { renderGotcha, renderSection } from "~/lib/llms";

export const GET: APIRoute = ({ site }) => {
	const base = site?.href.replace(/\/$/, "") ?? "https://promql.fyi";

	const sections = cardSections.map(renderSection).join("\n\n");

	const gotchaSubtitle = gotchaSection.subtitle?.replace(/<[^>]+>/g, "") ?? "";
	const gotchas = gotchaCards.map(renderGotcha).join("\n\n");

	const body = `# PromQL Cheatsheet

> A modern reference for the Prometheus query language — types, selectors, operators, aggregations, functions, time syntax, and the gotchas you only learn at 3am.

Source: ${base}/

${sections}

## ${gotchaSection.title}

${gotchaSubtitle}

${gotchas}
`;

	return new Response(body, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
};
