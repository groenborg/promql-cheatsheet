import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx()],
  build: { inlineStylesheets: 'always' },
  vite: {
    server: { fs: { strict: false } },
  },
});
