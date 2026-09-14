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
