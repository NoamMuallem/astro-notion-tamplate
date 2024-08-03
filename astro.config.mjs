import tailwind from "@astrojs/tailwind";
import { defineConfig, envField } from "astro/config";

import react from "@astrojs/react";

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
          optional: false
        })
      }
    }
  }
});
