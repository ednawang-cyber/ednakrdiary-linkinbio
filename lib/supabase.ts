import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Server-side client for admin operations
export const supabaseAdmin = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key);
};

// Database types
export interface Course {
  id: string;
  name: string;
  day: string;
  level: string;
  time: string;
  availableSpots: number;
  description: string;
  registrationLink: string;
  created_at: string;
  updated_at: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  link: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface HomepageConfig {
  id: number;
  name: string;
  korean_name: string;
  brand_name: string;
  bio: string;
  avatar_url: string;
  line_link: string;
  button1_text: string;
  button2_text: string;
  bg_color: string;
  button1_color: string;
  button2_color: string;
  updated_at: string;
}

// 獲取首頁配置
export async function getHomepageConfig(): Promise<HomepageConfig | null> {
  try {
    const { data, error } = await supabase
      .from("homepage_config")
      .select("*")
      .eq("id", 1)
      .single();

    if (error) {
      console.error("Error fetching homepage config:", error);
      return null;
    }

    return data as HomepageConfig;
  } catch (error) {
    console.error("Error in getHomepageConfig:", error);
    return null;
  }
}

// 更新首頁配置
export async function updateHomepageConfig(
  updates: Partial<HomepageConfig>
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("homepage_config")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);

    if (error) {
      console.error("Error updating homepage config:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in updateHomepageConfig:", error);
    return false;
  }
}

// 記錄訪問事件
export async function logPageEvent(
  eventType: string,
  eventData?: Record<string, any>
): Promise<void> {
  try {
    await supabase.from("page_stats").insert([
      {
        event_type: eventType,
        event_data: eventData || {},
      },
    ]);
  } catch (error) {
    console.error("Error logging page event:", error);
  }
}

// 獲取訪問統計
export async function getPageStats(days: number = 7) {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
      .from("page_stats")
      .select("*")
      .gte("created_at", startDate.toISOString())
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching page stats:", error);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error in getPageStats:", error);
    return [];
  }
}

// ========== 課程管理 ==========
export async function getCourses() {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("published", true)
      .order("order_num", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

export async function createCourse(course: Partial<Course>) {
  try {
    const { data, error } = await supabase
      .from("courses")
      .insert([course])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating course:", error);
    return null;
  }
}

export async function updateCourse(id: string, course: Partial<Course>) {
  try {
    const { error } = await supabase
      .from("courses")
      .update({ ...course, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error updating course:", error);
    return false;
  }
}

export async function deleteCourse(id: string) {
  try {
    const { error } = await supabase
      .from("courses")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting course:", error);
    return false;
  }
}

// ========== 資源管理 ==========
export async function getResources() {
  try {
    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .eq("published", true)
      .order("order_num", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching resources:", error);
    return [];
  }
}

export async function createResource(resource: Partial<Resource>) {
  try {
    const { data, error } = await supabase
      .from("resources")
      .insert([resource])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating resource:", error);
    return null;
  }
}

export async function updateResource(id: string, resource: Partial<Resource>) {
  try {
    const { error } = await supabase
      .from("resources")
      .update({ ...resource, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error updating resource:", error);
    return false;
  }
}

export async function deleteResource(id: string) {
  try {
    const { error } = await supabase
      .from("resources")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting resource:", error);
    return false;
  }
}

// ========== 好康管理 ==========
export async function getDeals() {
  try {
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .eq("published", true)
      .order("order_num", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching deals:", error);
    return [];
  }
}

export async function createDeal(deal: Partial<Deal>) {
  try {
    const { data, error } = await supabase
      .from("deals")
      .insert([deal])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating deal:", error);
    return null;
  }
}

export async function updateDeal(id: string, deal: Partial<Deal>) {
  try {
    const { error } = await supabase
      .from("deals")
      .update({ ...deal, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error updating deal:", error);
    return false;
  }
}

export async function deleteDeal(id: string) {
  try {
    const { error } = await supabase
      .from("deals")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting deal:", error);
    return false;
  }
}
