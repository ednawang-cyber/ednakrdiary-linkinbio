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
  available_spots: number;
  description: string;
  registration_link: string;
  published: boolean;
  order_num: number;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  link: string;
  image: string;
  published: boolean;
  order_num: number;
}

interface Deal {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
  published: boolean;
  order_num: number;
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

  // 編輯表單狀態
  const [editingCourse, setEditingCourse] = useState<Partial<Course> | null>(null);
  const [editingResource, setEditingResource] = useState<Partial<Resource> | null>(null);
  const [editingDeal, setEditingDeal] = useState<Partial<Deal> | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("linkinbio_admin_auth");
    if (saved) {
      setIsAuthenticated(true);
      loadAllData();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";
    if (password === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem("linkinbio_admin_auth", "true");
      loadAllData();
    } else {
      alert("密碼錯誤");
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [configRes, coursesRes, resourcesRes, dealsRes] = await Promise.all([
        fetch("/api/homepage-config"),
        fetch("/api/courses"),
        fetch("/api/resources"),
        fetch("/api/deals"),
      ]);

      if (configRes.ok) setConfig(await configRes.json());
      if (coursesRes.ok) {
        const data = await coursesRes.json();
        setCourses(data.courses || []);
      }
      if (resourcesRes.ok) {
        const data = await resourcesRes.json();
        setResources(data.resources || []);
      }
      if (dealsRes.ok) {
        const data = await dealsRes.json();
        setDeals(data.deals || []);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setLoading(false);
  };

  // 課程操作
  const saveCourse = async (course: Partial<Course>) => {
    try {
      const method = course.id ? "PUT" : "POST";
      await fetch("/api/courses", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(course),
      });
      await loadAllData();
      setEditingCourse(null);
      alert("保存成功！");
    } catch {
      alert("保存失敗");
    }
  };

  const deleteCourse = async (id: string) => {
    if (!confirm("確定刪除？")) return;
    try {
      await fetch("/api/courses", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      await loadAllData();
    } catch {
      alert("刪除失敗");
    }
  };

  // 資源操作
  const saveResource = async (resource: Partial<Resource>) => {
    try {
      const method = resource.id ? "PUT" : "POST";
      await fetch("/api/resources", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resource),
      });
      await loadAllData();
      setEditingResource(null);
      alert("保存成功！");
    } catch {
      alert("保存失敗");
    }
  };

  const deleteResource = async (id: string) => {
    if (!confirm("確定刪除？")) return;
    try {
      await fetch("/api/resources", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      await loadAllData();
    } catch {
      alert("刪除失敗");
    }
  };

  // 好康操作
  const saveDeal = async (deal: Partial<Deal>) => {
    try {
      const method = deal.id ? "PUT" : "POST";
      await fetch("/api/deals", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deal),
      });
      await loadAllData();
      setEditingDeal(null);
      alert("保存成功！");
    } catch {
      alert("保存失敗");
    }
  };

  const deleteDeal = async (id: string) => {
    if (!confirm("確定刪除？")) return;
    try {
      await fetch("/api/deals", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      await loadAllData();
    } catch {
      alert("刪除失敗");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("linkinbio_admin_auth");
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="w-full max-w-sm px-6">
          <h1 className="text-3xl font-serif text-center mb-8">後台管理</h1>
          <form
            onSubmit={handleLogin}
            className="space-y-4 bg-white p-8 border border-stone-300"
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-stone-300"
              placeholder="密碼"
            />
            <button
              type="submit"
              className="w-full py-2 bg-stone-900 text-white hover:bg-stone-800"
            >
              登入
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif">後台管理</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-stone-900 text-white"
          >
            登出
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-stone-300 overflow-x-auto">
          {[
            { id: "homepage", label: "首頁設定" },
            { id: "courses", label: "課程" },
            { id: "resources", label: "資源" },
            { id: "deals", label: "好康" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 border-b-2 ${
                activeTab === tab.id
                  ? "border-stone-900 font-serif"
                  : "border-transparent text-stone-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">加載中...</div>
        ) : (
          <>
            {/* 首頁配置 */}
            {activeTab === "homepage" && config && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="名字"
                    value={config.name}
                    onChange={(e) =>
                      setConfig({ ...config, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-stone-300"
                  />
                  <input
                    type="text"
                    placeholder="韓文名"
                    value={config.korean_name}
                    onChange={(e) =>
                      setConfig({ ...config, korean_name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-stone-300"
                  />
                  <input
                    type="text"
                    placeholder="品牌名"
                    value={config.brand_name}
                    onChange={(e) =>
                      setConfig({ ...config, brand_name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-stone-300"
                  />
                  <textarea
                    placeholder="自我介紹"
                    value={config.bio}
                    onChange={(e) =>
                      setConfig({ ...config, bio: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-stone-300"
                  />
                  <input
                    type="text"
                    placeholder="LINE 連結"
                    value={config.line_link}
                    onChange={(e) =>
                      setConfig({ ...config, line_link: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-stone-300"
                  />
                  <button
                    onClick={async () => {
                      setSaving(true);
                      await fetch("/api/homepage-config", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          name: config.name,
                          korean_name: config.korean_name,
                          brand_name: config.brand_name,
                          bio: config.bio,
                          line_link: config.line_link,
                          button1_color: config.button1_color,
                          button2_color: config.button2_color,
                          bg_color: config.bg_color,
                        }),
                      });
                      setSaving(false);
                      alert("保存成功！");
                    }}
                    className="w-full py-2 bg-stone-900 text-white"
                  >
                    保存
                  </button>
                </div>
              </div>
            )}

            {/* 課程管理 */}
            {activeTab === "courses" && (
              <div className="space-y-6">
                <button
                  onClick={() =>
                    setEditingCourse({ name: "", day: "", level: "", time: "", available_spots: 0, description: "", registration_link: "", published: true, order_num: courses.length })
                  }
                  className="px-4 py-2 bg-stone-900 text-white"
                >
                  新增課程
                </button>

                {editingCourse && (
                  <div className="bg-white p-6 border border-stone-300">
                    <h3 className="font-serif mb-4">編輯課程</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="課程名"
                        value={editingCourse.name || ""}
                        onChange={(e) =>
                          setEditingCourse({
                            ...editingCourse,
                            name: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-stone-300"
                      />
                      <input
                        type="text"
                        placeholder="星期"
                        value={editingCourse.day || ""}
                        onChange={(e) =>
                          setEditingCourse({
                            ...editingCourse,
                            day: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-stone-300"
                      />
                      <input
                        type="text"
                        placeholder="等級"
                        value={editingCourse.level || ""}
                        onChange={(e) =>
                          setEditingCourse({
                            ...editingCourse,
                            level: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-stone-300"
                      />
                      <input
                        type="text"
                        placeholder="時間"
                        value={editingCourse.time || ""}
                        onChange={(e) =>
                          setEditingCourse({
                            ...editingCourse,
                            time: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-stone-300"
                      />
                      <input
                        type="number"
                        placeholder="可插班人數"
                        value={editingCourse.available_spots || 0}
                        onChange={(e) =>
                          setEditingCourse({
                            ...editingCourse,
                            available_spots: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border border-stone-300"
                      />
                      <textarea
                        placeholder="說明"
                        value={editingCourse.description || ""}
                        onChange={(e) =>
                          setEditingCourse({
                            ...editingCourse,
                            description: e.target.value,
                          })
                        }
                        rows={2}
                        className="w-full px-3 py-2 border border-stone-300"
                      />
                      <input
                        type="text"
                        placeholder="報名連結"
                        value={editingCourse.registration_link || ""}
                        onChange={(e) =>
                          setEditingCourse({
                            ...editingCourse,
                            registration_link: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-stone-300"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            saveCourse(editingCourse as Partial<Course>)
                          }
                          className="flex-1 py-2 bg-stone-900 text-white"
                        >
                          保存
                        </button>
                        <button
                          onClick={() => setEditingCourse(null)}
                          className="flex-1 py-2 bg-stone-300"
                        >
                          取消
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="p-4 border border-stone-200 flex justify-between items-start"
                    >
                      <div>
                        <div className="font-serif">
                          {course.day} · {course.level} · {course.name}
                        </div>
                        <div className="text-sm text-stone-600">
                          {course.time} | 可插班 {course.available_spots} 人
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingCourse(course)}
                          className="px-3 py-1 bg-stone-200 text-sm"
                        >
                          編輯
                        </button>
                        <button
                          onClick={() => deleteCourse(course.id)}
                          className="px-3 py-1 bg-red-200 text-sm text-red-900"
                        >
                          刪除
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 資源管理 */}
            {activeTab === "resources" && (
              <div className="space-y-6">
                <button
                  onClick={() =>
                    setEditingResource({
                      title: "",
                      description: "",
                      category: "",
                      link: "",
                      image: "",
                      published: true,
                      order_num: resources.length,
                    })
                  }
                  className="px-4 py-2 bg-stone-900 text-white"
                >
                  新增資源
                </button>

                {editingResource && (
                  <div className="bg-white p-6 border border-stone-300">
                    <h3 className="font-serif mb-4">編輯資源</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="標題"
                        value={editingResource.title || ""}
                        onChange={(e) =>
                          setEditingResource({
                            ...editingResource,
                            title: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-stone-300"
                      />
                      <input
                        type="text"
                        placeholder="分類"
                        value={editingResource.category || ""}
                        onChange={(e) =>
                          setEditingResource({
                            ...editingResource,
                            category: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-stone-300"
                      />
                      <textarea
                        placeholder="說明"
                        value={editingResource.description || ""}
                        onChange={(e) =>
                          setEditingResource({
                            ...editingResource,
                            description: e.target.value,
                          })
                        }
                        rows={2}
                        className="w-full px-3 py-2 border border-stone-300"
                      />
                      <input
                        type="text"
                        placeholder="連結"
                        value={editingResource.link || ""}
                        onChange={(e) =>
                          setEditingResource({
                            ...editingResource,
                            link: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-stone-300"
                      />
                      <input
                        type="text"
                        placeholder="圖片 URL"
                        value={editingResource.image || ""}
                        onChange={(e) =>
                          setEditingResource({
                            ...editingResource,
                            image: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-stone-300"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            saveResource(editingResource as Partial<Resource>)
                          }
                          className="flex-1 py-2 bg-stone-900 text-white"
                        >
                          保存
                        </button>
                        <button
                          onClick={() => setEditingResource(null)}
                          className="flex-1 py-2 bg-stone-300"
                        >
                          取消
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {resources.map((resource) => (
                    <div
                      key={resource.id}
                      className="p-4 border border-stone-200 flex justify-between items-start"
                    >
                      <div>
                        <div className="font-serif">{resource.title}</div>
                        <div className="text-sm text-stone-600">
                          {resource.category}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingResource(resource)}
                          className="px-3 py-1 bg-stone-200 text-sm"
                        >
                          編輯
                        </button>
                        <button
                          onClick={() => deleteResource(resource.id)}
                          className="px-3 py-1 bg-red-200 text-sm text-red-900"
                        >
                          刪除
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 好康管理 */}
            {activeTab === "deals" && (
              <div className="space-y-6">
                <button
                  onClick={() =>
                    setEditingDeal({
                      title: "",
                      description: "",
                      link: "",
                      image: "",
                      published: true,
                      order_num: deals.length,
                    })
                  }
                  className="px-4 py-2 bg-stone-900 text-white"
                >
                  新增好康
                </button>

                {editingDeal && (
                  <div className="bg-white p-6 border border-stone-300">
                    <h3 className="font-serif mb-4">編輯好康</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="標題"
                        value={editingDeal.title || ""}
                        onChange={(e) =>
                          setEditingDeal({
                            ...editingDeal,
                            title: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-stone-300"
                      />
                      <textarea
                        placeholder="說明"
                        value={editingDeal.description || ""}
                        onChange={(e) =>
                          setEditingDeal({
                            ...editingDeal,
                            description: e.target.value,
                          })
                        }
                        rows={2}
                        className="w-full px-3 py-2 border border-stone-300"
                      />
                      <input
                        type="text"
                        placeholder="連結"
                        value={editingDeal.link || ""}
                        onChange={(e) =>
                          setEditingDeal({
                            ...editingDeal,
                            link: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-stone-300"
                      />
                      <input
                        type="text"
                        placeholder="圖片 URL"
                        value={editingDeal.image || ""}
                        onChange={(e) =>
                          setEditingDeal({
                            ...editingDeal,
                            image: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-stone-300"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveDeal(editingDeal as Partial<Deal>)}
                          className="flex-1 py-2 bg-stone-900 text-white"
                        >
                          保存
                        </button>
                        <button
                          onClick={() => setEditingDeal(null)}
                          className="flex-1 py-2 bg-stone-300"
                        >
                          取消
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {deals.map((deal) => (
                    <div
                      key={deal.id}
                      className="p-4 border border-stone-200 flex justify-between items-start"
                    >
                      <div className="font-serif">{deal.title}</div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingDeal(deal)}
                          className="px-3 py-1 bg-stone-200 text-sm"
                        >
                          編輯
                        </button>
                        <button
                          onClick={() => deleteDeal(deal.id)}
                          className="px-3 py-1 bg-red-200 text-sm text-red-900"
                        >
                          刪除
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
