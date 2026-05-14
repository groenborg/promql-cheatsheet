import type { Card, Gotcha, Section } from "~/content/types";

const stripHtml = (html: string): string =>
	html
		.replace(/<code>(.*?)<\/code>/g, "`$1`")
		.replace(/<strong>(.*?)<\/strong>/g, "**$1**")
		.replace(/<em>(.*?)<\/em>/g, "*$1*")
		.replace(/<[^>]+>/g, "")
		.trim();

export const renderCard = (card: Card): string => {
	const parts: string[] = [`### ${stripHtml(card.title)}`];
	if (card.badge) parts.push(`_${card.badge}_`);
	if (card.description) parts.push(stripHtml(card.description));
	if (card.code) parts.push("```promql\n" + card.code + "\n```");
	if (card.note) parts.push(`> ${stripHtml(card.note)}`);
	return parts.join("\n\n");
};

export const renderGotcha = (g: Gotcha): string =>
	`### ${stripHtml(g.title)}\n\n${stripHtml(g.description)}`;

export const renderSection = (s: Section): string => {
	const head = `## ${s.title}${s.subtitle ? `\n\n${stripHtml(s.subtitle)}` : ""}`;
	const body = s.cards.map(renderCard).join("\n\n");
	return `${head}\n\n${body}`;
};
