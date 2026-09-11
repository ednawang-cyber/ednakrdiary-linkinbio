import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export interface Course {
  id: string;
  name: string;
  day: string;
  level: string;
  time: string;
  availableSpots: number;
  description: string;
  registrationLink: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  link: string;
  image: string;
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
}

export interface ContentData {
  courses: Course[];
  resources: Resource[];
  deals: Deal[];
}

// Helper function to extract text from Notion rich text
function extractText(richText: any[]): string {
  if (!richText) return "";
  return richText.map((text) => text.plain_text).join("");
}

// Helper function to get property value from Notion page
function getPropertyValue(properties: any, propertyName: string): any {
  const property = properties[propertyName];
  if (!property) return null;

  switch (property.type) {
    case "title":
      return extractText(property.title);
    case "rich_text":
      return extractText(property.rich_text);
    case "number":
      return property.number;
    case "url":
      return property.url;
    case "select":
      return property.select?.name || "";
    case "multi_select":
      return property.multi_select?.map((s: any) => s.name).join(", ") || "";
    case "checkbox":
      return property.checkbox;
    default:
      return null;
  }
}

// Fetch courses from Notion
export async function fetchCourses(): Promise<Course[]> {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID_COURSES;
    if (!databaseId) {
      console.error("NOTION_DATABASE_ID_COURSES is not set");
      return [];
    }

    const response = await (notion.databases as any).query({
      database_id: databaseId,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Order",
          direction: "ascending",
        },
      ],
    });

    return response.results.map((page: any) => ({
      id: page.id,
      name: getPropertyValue(page.properties, "Name") || "",
      day: getPropertyValue(page.properties, "Day") || "",
      level: getPropertyValue(page.properties, "Level") || "",
      time: getPropertyValue(page.properties, "Time") || "",
      availableSpots: getPropertyValue(page.properties, "Available Spots") || 0,
      description: getPropertyValue(page.properties, "Description") || "",
      registrationLink: getPropertyValue(page.properties, "Registration Link") || "",
    }));
  } catch (error) {
    console.error("Error fetching courses from Notion:", error);
    return [];
  }
}

// Fetch resources from Notion
export async function fetchResources(): Promise<Resource[]> {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID_RESOURCES;
    if (!databaseId) {
      console.error("NOTION_DATABASE_ID_RESOURCES is not set");
      return [];
    }

    const response = await (notion.databases as any).query({
      database_id: databaseId,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Order",
          direction: "ascending",
        },
      ],
    });

    return response.results.map((page: any) => ({
      id: page.id,
      title: getPropertyValue(page.properties, "Title") || "",
      description: getPropertyValue(page.properties, "Description") || "",
      category: getPropertyValue(page.properties, "Category") || "",
      link: getPropertyValue(page.properties, "Link") || "",
      image: getPropertyValue(page.properties, "Image") || "",
    }));
  } catch (error) {
    console.error("Error fetching resources from Notion:", error);
    return [];
  }
}

// Fetch deals from Notion
export async function fetchDeals(): Promise<Deal[]> {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID_DEALS;
    if (!databaseId) {
      console.error("NOTION_DATABASE_ID_DEALS is not set");
      return [];
    }

    const response = await (notion.databases as any).query({
      database_id: databaseId,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Order",
          direction: "ascending",
        },
      ],
    });

    return response.results.map((page: any) => ({
      id: page.id,
      title: getPropertyValue(page.properties, "Title") || "",
      description: getPropertyValue(page.properties, "Description") || "",
      link: getPropertyValue(page.properties, "Link") || "",
      image: getPropertyValue(page.properties, "Image") || "",
    }));
  } catch (error) {
    console.error("Error fetching deals from Notion:", error);
    return [];
  }
}

// Fetch all content from Notion
export async function fetchAllContent(): Promise<ContentData> {
  const [courses, resources, deals] = await Promise.all([
    fetchCourses(),
    fetchResources(),
    fetchDeals(),
  ]);

  return {
    courses,
    resources,
    deals,
  };
}

// Create a course in Notion (for future admin panel)
export async function createCourse(course: Course): Promise<string | null> {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID_COURSES;
    if (!databaseId) return null;

    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        Name: {
          title: [{ text: { content: course.name } }],
        },
        Day: {
          rich_text: [{ text: { content: course.day } }],
        },
        Level: {
          rich_text: [{ text: { content: course.level } }],
        },
        Time: {
          rich_text: [{ text: { content: course.time } }],
        },
        "Available Spots": {
          number: course.availableSpots,
        },
        Description: {
          rich_text: [{ text: { content: course.description } }],
        },
        "Registration Link": {
          url: course.registrationLink,
        },
        Published: {
          checkbox: true,
        },
      },
    });

    return response.id;
  } catch (error) {
    console.error("Error creating course in Notion:", error);
    return null;
  }
}

// Update a course in Notion (for future admin panel)
export async function updateCourse(
  pageId: string,
  course: Course
): Promise<boolean> {
  try {
    await notion.pages.update({
      page_id: pageId,
      properties: {
        Name: {
          title: [{ text: { content: course.name } }],
        },
        Day: {
          rich_text: [{ text: { content: course.day } }],
        },
        Level: {
          rich_text: [{ text: { content: course.level } }],
        },
        Time: {
          rich_text: [{ text: { content: course.time } }],
        },
        "Available Spots": {
          number: course.availableSpots,
        },
        Description: {
          rich_text: [{ text: { content: course.description } }],
        },
        "Registration Link": {
          url: course.registrationLink,
        },
      },
    });

    return true;
  } catch (error) {
    console.error("Error updating course in Notion:", error);
    return false;
  }
}

// Delete a course in Notion (for future admin panel)
export async function deleteCourse(pageId: string): Promise<boolean> {
  try {
    await notion.pages.update({
      page_id: pageId,
      archived: true,
    });

    return true;
  } catch (error) {
    console.error("Error deleting course in Notion:", error);
    return false;
  }
}
