import { createHighlighter, type Highlighter } from "shiki";
import promqlTheme from "./promql.theme.json" with { type: "json" };
import promqlGrammar from "./promql.tmLanguage.json" with { type: "json" };

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
	if (!highlighterPromise) {
		highlighterPromise = createHighlighter({
			themes: [
				promqlTheme as Parameters<
					typeof createHighlighter
				>[0]["themes"][number],
			],
			langs: [
				promqlGrammar as Parameters<
					typeof createHighlighter
				>[0]["langs"][number],
			],
		});
	}
	return highlighterPromise;
}

export async function highlightPromQL(code: string): Promise<string> {
	const highlighter = await getHighlighter();
	const html = highlighter.codeToHtml(code, {
		lang: "promql",
		theme: "promql",
	});
	// Strip the wrapping <pre class="shiki ..." style="..."> and its inline style/class —
	// our own .code class owns padding, radius, background, and font sizing.
	// Keep the inner spans (with their inline color styles) and the <code> wrapper.
	return html
		.replace(/^<pre[^>]*>/, '<pre class="code">')
		.replace(/<code[^>]*>/, "<code>");
}
