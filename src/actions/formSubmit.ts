import { ActionError, defineAction, z } from "astro:actions";
import { NOTION_CONTACT_US_DB_ID } from "astro:env/server";
import { formFieldsObject } from "../features/contactUsForm";
import { addLeadToNotion } from "../utils/DB";

export const contactUsFormSubmission = defineAction({
  input: z.object({
    [formFieldsObject.Name]: z
      .string()
      .min(5, { message: "Name cannot be shorter then 5" }),
    [formFieldsObject.Email]: z.string().email({ message: "Invalid email" }),
    [formFieldsObject.Message]: z
      .string()
      .min(10, { message: "Message cannot be shorter then 10" }),
  }),
  // no need to parse anything, the form fields will be parsed by zod under the hood
  accept: "form",
  handler: async (payload) => {
    try {
      //   if (await isRateLimited(ctx)) {
      //     throw new ActionError({
      //       message: "Too many requests",
      //       code: "TOO_MANY_REQUESTS",
      //     });
      //   }
      await addLeadToNotion({
        ...payload,
        databaseId: NOTION_CONTACT_US_DB_ID,
      });
      return { success: true };
    } catch (e) {
      throw new ActionError({
        message: "Unknown error occurred",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  },
});
