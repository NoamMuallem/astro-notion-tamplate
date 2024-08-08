import bookmarkPlugin from "@notion-render/bookmark-plugin";
import { NotionRenderer } from "@notion-render/client";
import hljsPlugin from "@notion-render/hljs-plugin";
import { NOTION_POSTS_DB } from "astro:env/server";
import { getPageBySlug, getPageContent, notionClient } from "./DB";

export const extractPostData = async ({ slug }: { slug: string }) => {
  const post = await getPageBySlug(slug as string, NOTION_POSTS_DB);
  if (!post) {
    return {
      status: 404,
      error: new Error(`Post not found`),
    };
  }
  // @ts-ignore: Notion does not supply a full type coverage for it's tables
  const title = post.properties.Title.title[0].plain_text;
  // @ts-ignore: Notion does not supply a full type coverage for it's tables
  const image = post.properties.BannerImage.files[0].file.url;
  // @ts-ignore: Notion does not supply a full type coverage for it's tables
  const description = post.properties.Description.rich_text[0]
    .plain_text as string;
  const content = await getPageContent(post.id);

  const notionRenderer = new NotionRenderer({
    client: notionClient,
  });

  await notionRenderer.use(hljsPlugin({}));
  await notionRenderer.use(bookmarkPlugin(undefined));
  const html = await notionRenderer.render(...content);
  return { title, image, description, html };
};
