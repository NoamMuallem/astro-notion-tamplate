import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig, envField } from "astro/config";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  output: "hybrid",
  experimental: {
    actions: true,
    env: {
      schema: {
        NOTION_INTEGRATION_TOKEN: envField.string({
          context: "server",
          access: "public",
          optional: false,
        }),
        NOTION_CONTACT_US_DB_ID: envField.string({
          context: "server",
          access: "public",
          optional: false,
        }),
        NOTION_POSTS_DB: envField.string({
          context: "server",
          access: "public",
          optional: false,
        }),
      },
    },
  },
  adapter: netlify(),
});
