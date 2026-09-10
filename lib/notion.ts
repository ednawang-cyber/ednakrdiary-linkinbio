import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function getCourses() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID_COURSES || "",
  });

  return response.results.map((block: any) => {
    const properties = block.properties;
    return {
      id: block.id,
      name: properties.名稱?.title?.[0]?.plain_text || "",
      day: properties.曜日?.select?.name || "",
      level: properties.程度?.select?.name || "",
      time: properties.時間?.rich_text?.[0]?.plain_text || "",
      availableSpots: properties.可插班人數?.number || 0,
      description: properties.說明?.rich_text?.[0]?.plain_text || "",
      registrationLink: properties.報名連結?.url || "",
    };
  });
}

export async function getResources() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID_RESOURCES || "",
  });

  return response.results.map((block: any) => {
    const properties = block.properties;
    return {
      id: block.id,
      title: properties.標題?.title?.[0]?.plain_text || "",
      description: properties.描述?.rich_text?.[0]?.plain_text || "",
      category: properties.分類?.select?.name || "",
      link: properties.連結?.url || "",
      image: properties.圖片?.files?.[0]?.file?.url || "",
    };
  });
}

export async function getDeals() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID_DEALS || "",
  });

  return response.results.map((block: any) => {
    const properties = block.properties;
    return {
      id: block.id,
      title: properties.標題?.title?.[0]?.plain_text || "",
      description: properties.描述?.rich_text?.[0]?.plain_text || "",
      link: properties.連結?.url || "",
      image: properties.圖片?.files?.[0]?.file?.url || "",
    };
  });
}
