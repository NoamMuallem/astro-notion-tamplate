const { fontFamily } = require("tailwindcss/defaultTheme");
const config = require("./tailwind.theme.config.mjs");
/**
 * Find the applicable theme color palette, or use the default one
 */
const themeConfig =
  process.env.THEME_KEY && config[process.env.THEME_KEY]
    ? config[process.env.THEME_KEY]
    : config.default;
const { colors } = themeConfig;
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  safelist: ["dark"],
  theme: {},
  variants: {
    extend: { typography: ["dark"] },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
