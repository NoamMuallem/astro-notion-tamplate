import { ActionError, defineAction, z } from "astro:actions";
import { NOTION_CONTACT_US_DB_ID } from "astro:env/server";
import { FormFieldsObject } from "../features/contactUsForm";
import { addLeadToNotion } from "../utils/DB";

export const contactUsFormSubmission = defineAction({
  input: z.object({
    [FormFieldsObject.Name]: z
      .string()
      .min(5, { message: "Name cannot be shorter then 5" }),
    [FormFieldsObject.Email]: z.string().email({ message: "Invalid email" }),
    [FormFieldsObject.Message]: z
      .string()
      .min(10, { message: "Message cannot be shorter then 10" }),
  }),
  // no need to parse anything, the form fields will be parsed by zod under the hood
  accept: "form",
  handler: async (payload) => {
    try {
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
