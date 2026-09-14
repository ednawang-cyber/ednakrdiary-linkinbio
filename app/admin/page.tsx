"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HomepageConfig } from "@/lib/supabase";

interface Course {
  id: string;
  name: string;
  day: string;
  level: string;
  time: string;
  availableSpots: number;
  description: string;
  registrationLink: string;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  link: string;
  image: string;
}

interface Deal {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("homepage");
  const [config, setConfig] = useState<HomepageConfig | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("linkinbio_admin_auth");
    if (saved) {
      setIsAuthenticated(true);
      loadConfig();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";
    if (password === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem("linkinbio_admin_auth", "true");
      loadConfig();
    } else {
      alert("密碼錯誤");
    }
  };

  const loadConfig = async () => {
    setLoading(true);
    try {
      const [configRes, contentRes] = await Promise.all([
        fetch("/api/homepage-config"),
        fetch("/api/content"),
      ]);

      if (configRes.ok) {
        const data = await configRes.json();
        setConfig(data);
      }

      if (contentRes.ok) {
        const contentData = await contentRes.json();
        setCourses(contentData.courses || []);
        setResources(contentData.resources || []);
        setDeals(contentData.deals || []);
      }
    } catch (error) {
      console.error("Error loading:", error);
    }
    setLoading(false);
  };

  const handleSaveConfig = async () => {
    if (!config) return;
    setSaving(true);
    try {
      await fetch("/api/homepage-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: config.name,
          korean_name: config.korean_name,
          brand_name: config.brand_name,
          bio: config.bio,
          avatar_url: config.avatar_url,
          line_link: config.line_link,
          button1_text: config.button1_text,
          button2_text: config.button2_text,
          bg_color: config.bg_color,
          button1_color: config.button1_color,
          button2_color: config.button2_color,
        }),
      });
      alert("首頁配置已保存！");
    } catch {
      alert("保存失敗");
    }
    setSaving(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    localStorage.removeItem("linkinbio_admin_auth");
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="w-full max-w-sm px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-stone-900 mb-2">後台管理</h1>
            <p className="text-stone-600">蔚樺 웨이화 | 韓語蜂蜜罐</p>
          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-4 bg-white p-8 border border-stone-300"
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-stone-300 focus:outline-none focus:border-stone-600"
              placeholder="輸入密碼"
            />
            <button
              type="submit"
              className="w-full py-2 bg-stone-900 text-white font-serif tracking-widest hover:bg-stone-800"
            >
              登入
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-stone-600 hover:underline">
              返回首頁
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-stone-300">
          <div>
            <h1 className="text-3xl font-serif text-stone-900">後台管理</h1>
            <p className="text-stone-600 mt-1">蔚樺 웨이화 | 韓語蜂蜜罐</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-stone-900 text-white text-sm hover:bg-stone-800"
          >
            登出
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-stone-300 overflow-x-auto">
          {[
            { id: "homepage", label: "首頁配置" },
            { id: "courses", label: "課程管理" },
            { id: "resources", label: "資源管理" },
            { id: "deals", label: "好康分享" },
            { id: "preview", label: "預覽" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-serif border-b-2 transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-stone-900 text-stone-900"
                  : "border-transparent text-stone-600 hover:text-stone-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">加載中...</div>
        ) : (
          <>
            {/* 首頁配置 */}
            {activeTab === "homepage" && config && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-serif mb-1">名字</label>
                    <input
                      type="text"
                      value={config.name}
                      onChange={(e) =>
                        setConfig({ ...config, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-stone-300 focus:outline-none focus:border-stone-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-serif mb-1">韓文名</label>
                    <input
                      type="text"
                      value={config.korean_name}
                      onChange={(e) =>
                        setConfig({ ...config, korean_name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-stone-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-serif mb-1">品牌名</label>
                    <input
                      type="text"
                      value={config.brand_name}
                      onChange={(e) =>
                        setConfig({ ...config, brand_name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-stone-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-serif mb-1">自我介紹</label>
                    <textarea
                      value={config.bio}
                      onChange={(e) =>
                        setConfig({ ...config, bio: e.target.value })
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-stone-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-serif mb-1">LINE 連結</label>
                    <input
                      type="text"
                      value={config.line_link}
                      onChange={(e) =>
                        setConfig({ ...config, line_link: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-stone-300"
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="font-serif text-sm mb-3">配色設計</h3>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={config.bg_color}
                          onChange={(e) =>
                            setConfig({ ...config, bg_color: e.target.value })
                          }
                          className="w-10 h-10 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={config.bg_color}
                          onChange={(e) =>
                            setConfig({ ...config, bg_color: e.target.value })
                          }
                          className="flex-1 px-3 py-2 border border-stone-300"
                        />
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={config.button1_color}
                          onChange={(e) =>
                            setConfig({ ...config, button1_color: e.target.value })
                          }
                          className="w-10 h-10 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={config.button1_color}
                          onChange={(e) =>
                            setConfig({ ...config, button1_color: e.target.value })
                          }
                          className="flex-1 px-3 py-2 border border-stone-300"
                        />
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={config.button2_color}
                          onChange={(e) =>
                            setConfig({ ...config, button2_color: e.target.value })
                          }
                          className="w-10 h-10 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={config.button2_color}
                          onChange={(e) =>
                            setConfig({ ...config, button2_color: e.target.value })
                          }
                          className="flex-1 px-3 py-2 border border-stone-300"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSaveConfig}
                    disabled={saving}
                    className="w-full py-2 bg-stone-900 text-white font-serif hover:bg-stone-800 disabled:opacity-50"
                  >
                    {saving ? "保存中..." : "保存首頁配置"}
                  </button>
                </div>

                {/* 預覽 */}
                <div
                  className="p-6 border border-stone-300 rounded"
                  style={{ backgroundColor: config.bg_color }}
                >
                  <h3 className="font-serif text-center mb-4">預覽</h3>
                  <div className="text-center space-y-3">
                    <h2 className="text-3xl font-serif text-stone-900">
                      {config.name}
                    </h2>
                    <p className="text-xs text-stone-600">{config.korean_name}</p>
                    <h3 className="text-lg font-serif text-stone-900">
                      {config.brand_name}
                    </h3>
                    <p className="text-xs text-stone-700">{config.bio}</p>
                    <div className="space-y-1 pt-2">
                      <button
                        style={{ backgroundColor: config.button1_color }}
                        className="w-full py-2 text-xs text-white"
                      >
                        {config.button1_text}
                      </button>
                      <button
                        style={{ backgroundColor: config.button2_color }}
                        className="w-full py-2 text-xs text-stone-900"
                      >
                        {config.button2_text}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 課程管理 */}
            {activeTab === "courses" && (
              <div className="bg-white p-6 border border-stone-300 rounded">
                <h2 className="text-xl font-serif text-stone-900 mb-4">
                  目前開課班級 ({courses.length})
                </h2>
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="p-4 border border-stone-200 rounded"
                    >
                      <div className="font-serif text-stone-900 mb-1">
                        {course.day} · {course.level} · {course.name}
                      </div>
                      <div className="text-sm text-stone-600">
                        {course.time} | 可插班 {course.availableSpots} 人
                      </div>
                      <p className="text-xs text-stone-600 mt-1">
                        {course.description}
                      </p>
                      {course.registrationLink && (
                        <a
                          href={course.registrationLink}
                          target="_blank"
                          className="text-xs text-stone-900 hover:underline"
                        >
                          報名連結 →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-stone-600 mt-6">
                  💡 課程直接在 Notion 資料庫編輯
                </p>
              </div>
            )}

            {/* 資源管理 */}
            {activeTab === "resources" && (
              <div className="bg-white p-6 border border-stone-300 rounded">
                <h2 className="text-xl font-serif text-stone-900 mb-4">
                  學習資源 ({resources.length})
                </h2>
                <div className="grid gap-4">
                  {resources.map((resource) => (
                    <div
                      key={resource.id}
                      className="p-4 border border-stone-200 rounded"
                    >
                      <div className="font-serif text-stone-900">
                        {resource.title}
                      </div>
                      <p className="text-xs text-stone-600 mt-1">
                        {resource.category} · {resource.description}
                      </p>
                      <a
                        href={resource.link}
                        target="_blank"
                        className="text-xs text-stone-900 hover:underline"
                      >
                        查看資源 →
                      </a>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-stone-600 mt-6">
                  💡 資源直接在 Notion 資料庫編輯
                </p>
              </div>
            )}

            {/* 好康分享 */}
            {activeTab === "deals" && (
              <div className="bg-white p-6 border border-stone-300 rounded">
                <h2 className="text-xl font-serif text-stone-900 mb-4">
                  好康分享 ({deals.length})
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {deals.map((deal) => (
                    <div
                      key={deal.id}
                      className="p-4 border border-stone-200 rounded"
                    >
                      <div className="font-serif text-stone-900">
                        {deal.title}
                      </div>
                      <p className="text-xs text-stone-600 mt-1">
                        {deal.description}
                      </p>
                      <a
                        href={deal.link}
                        target="_blank"
                        className="text-xs text-stone-900 hover:underline"
                      >
                        查看好康 →
                      </a>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-stone-600 mt-6">
                  💡 好康直接在 Notion 資料庫編輯
                </p>
              </div>
            )}

            {/* 預覽 */}
            {activeTab === "preview" && (
              <div className="bg-white p-6 border border-stone-300 rounded">
                <iframe
                  src="/"
                  className="w-full h-96 border-0"
                  title="首頁預覽"
                />
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
