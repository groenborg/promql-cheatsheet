import mdx from "@astrojs/mdx";
import { defineConfig } from "astro/config";

export default defineConfig({
	site: "https://promql.fyi",
	integrations: [mdx()],
	build: { inlineStylesheets: "always" },
	vite: {
		server: { fs: { strict: false } },
	},
});
