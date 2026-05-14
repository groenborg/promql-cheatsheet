import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
	site: "https://promql.fyi",
	integrations: [mdx(), sitemap()],
	build: { inlineStylesheets: "always" },
	vite: {
		server: { fs: { strict: false } },
	},
});
