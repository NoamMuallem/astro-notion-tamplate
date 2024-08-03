import { defineAction } from "astro:actions";
import { NOTION_INTEGRATION_TOKEN } from "astro:env/server";

export const server = {
  contactUsFormSubmission: defineAction({
    // input: z.object(),
    // no need to parse anything, the form fields will be parsed by zod under the hood
    accept: "form",
    handler: ({}, ctx) => {
      return{ NOTION_INTEGRATION_TOKEN };
    },
  }),
};
