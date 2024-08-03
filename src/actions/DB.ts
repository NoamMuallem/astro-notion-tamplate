import { Client } from "@notionhq/client";
import {
    type BlockObjectResponse,
    type PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { NOTION_INTEGRATION_TOKEN } from "astro:env/server";
import { cache } from "react";

export const notionClient = new Client({
  auth: NOTION_INTEGRATION_TOKEN,
});

export const getPages = cache(({ databaseID }: { databaseID: string }) => {
  return notionClient.databases.query({
    filter: {
      property: "Status",
      status: {
        equals: "Published",
      },
    },
    database_id: databaseID,
  });
});

export const getPageContent = cache((pageId: string) => {
  return notionClient.blocks.children
    .list({ block_id: pageId })
    .then((res) => res.results as BlockObjectResponse[]);
});

export const getPageBySlug = cache((slug: string, databaseId:string) => {
  return notionClient.databases
    .query({
      database_id: databaseId,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    })
    .then((res) => res.results[0] as PageObjectResponse | undefined);
});

export const addLeadToNotion = async ({
  name,
  email,
  message,
  databaseId
}: {
  name:string,
  email:string,
  message:string,
 databaseId:string
}) => {
  if (!databaseId || !notionClient || !name || !email || !message)
    throw new Error("Failed to save message");

  await notionClient.pages.create({
    parent: {
      type: "database_id",
      database_id: databaseId,
    },
    properties: {
      Name: {
        title: [
          {
            type: "text",
            text: {
              content: name,
            },
          },
        ],
      },
      Email: {
        email,
      },
      Text: {
        rich_text: [
          {
            type: "text",
            text: {
              content: message,
            },
          },
        ],
      },
      Status: {
        select: {
          name: "Not started",
        },
      },
      "Created at": {
        date: {
          start: new Date().toISOString(),
        },
      },
    },
  });
};
