"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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
  const [activeTab, setActiveTab] = useState("courses");
  const [courses, setCourses] = useState<Course[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem("linkinbio_admin_auth");
    if (saved) {
      setIsAuthenticated(true);
      loadContent();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - replace with your actual password
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";
    if (password === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem("linkinbio_admin_auth", "true");
      loadContent();
    } else {
      alert("密碼錯誤");
    }
  };

  const loadContent = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/content");
      const data = await response.json();
      setCourses(data.courses || []);
      setResources(data.resources || []);
      setDeals(data.deals || []);
    } catch (error) {
      console.error("Error loading content:", error);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    localStorage.removeItem("linkinbio_admin_auth");
  };

  const saveCourses = async () => {
    try {
      await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courses, resources, deals }),
      });
      alert("已保存！");
    } catch (error) {
      alert("保存失敗");
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="w-full max-w-sm px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-stone-900 mb-2">
              後台管理
            </h1>
            <p className="text-stone-600">蔚樺 웨이화 | 韓語蜂蜜罐</p>
          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-4 bg-white p-8 border border-stone-200"
          >
            <div>
              <label className="block text-sm font-serif text-stone-900 mb-2">
                管理員密碼
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-stone-200 focus:outline-none focus:border-stone-400"
                placeholder="輸入密碼"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-stone-900 text-white font-serif tracking-widest hover:bg-stone-800 transition"
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
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex justify-between items-center mb-12 pb-6 border-b border-stone-200">
          <div>
            <h1 className="text-3xl font-serif text-stone-900">後台管理</h1>
            <p className="text-stone-600 mt-1">蔚樺 웨이화 | 韓語蜂蜜罐</p>
          </div>
          <div className="space-y-2">
            <Link
              href="/"
              className="block text-sm text-stone-600 hover:underline"
            >
              查看首頁
            </Link>
            <button
              onClick={handleLogout}
              className="block text-sm text-red-600 hover:underline"
            >
              登出
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mb-12 border-b border-stone-200">
          {[
            { id: "courses", label: "課程班級" },
            { id: "resources", label: "學習資源" },
            { id: "deals", label: "好康分享" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 font-serif text-lg transition border-b-2 ${
                activeTab === tab.id
                  ? "border-stone-900 text-stone-900"
                  : "border-transparent text-stone-600 hover:text-stone-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Management */}
        <div className="space-y-12">
          {/* Courses */}
          {activeTab === "courses" && (
            <div>
              <h2 className="text-2xl font-serif text-stone-900 mb-6">
                目前開課班級
              </h2>
              <div className="space-y-6">
                {courses.map((course, index) => (
                  <div
                    key={course.id}
                    className="border border-stone-200 p-6 space-y-4"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="課程名稱"
                        value={course.name}
                        onChange={(e) => {
                          const updated = [...courses];
                          updated[index].name = e.target.value;
                          setCourses(updated);
                        }}
                        className="px-3 py-2 border border-stone-200 focus:outline-none focus:border-stone-400"
                      />
                      <input
                        type="text"
                        placeholder="星期幾 (e.g., 週二)"
                        value={course.day}
                        onChange={(e) => {
                          const updated = [...courses];
                          updated[index].day = e.target.value;
                          setCourses(updated);
                        }}
                        className="px-3 py-2 border border-stone-200 focus:outline-none focus:border-stone-400"
                      />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="等級 (e.g., 零基礎)"
                        value={course.level}
                        onChange={(e) => {
                          const updated = [...courses];
                          updated[index].level = e.target.value;
                          setCourses(updated);
                        }}
                        className="px-3 py-2 border border-stone-200 focus:outline-none focus:border-stone-400"
                      />
                      <input
                        type="text"
                        placeholder="時間"
                        value={course.time}
                        onChange={(e) => {
                          const updated = [...courses];
                          updated[index].time = e.target.value;
                          setCourses(updated);
                        }}
                        className="px-3 py-2 border border-stone-200 focus:outline-none focus:border-stone-400"
                      />
                      <input
                        type="number"
                        placeholder="可插班人數"
                        value={course.availableSpots}
                        onChange={(e) => {
                          const updated = [...courses];
                          updated[index].availableSpots = parseInt(
                            e.target.value
                          );
                          setCourses(updated);
                        }}
                        className="px-3 py-2 border border-stone-200 focus:outline-none focus:border-stone-400"
                      />
                    </div>
                    <textarea
                      placeholder="描述"
                      value={course.description}
                      onChange={(e) => {
                        const updated = [...courses];
                        updated[index].description = e.target.value;
                        setCourses(updated);
                      }}
                      className="w-full px-3 py-2 border border-stone-200 focus:outline-none focus:border-stone-400"
                      rows={2}
                    />
                    <input
                      type="text"
                      placeholder="報名連結"
                      value={course.registrationLink}
                      onChange={(e) => {
                        const updated = [...courses];
                        updated[index].registrationLink = e.target.value;
                        setCourses(updated);
                      }}
                      className="w-full px-3 py-2 border border-stone-200 focus:outline-none focus:border-stone-400"
                    />
                    <button
                      onClick={() => {
                        const updated = courses.filter((_, i) => i !== index);
                        setCourses(updated);
                      }}
                      className="text-sm text-red-600 hover:underline"
                    >
                      刪除
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setCourses([
                      ...courses,
                      {
                        id: Date.now().toString(),
                        name: "",
                        day: "",
                        level: "",
                        time: "",
                        availableSpots: 0,
                        description: "",
                        registrationLink: "",
                      },
                    ]);
                  }}
                  className="px-6 py-2 bg-stone-900 text-white font-serif tracking-widest hover:bg-stone-800 transition"
                >
                  新增課程
                </button>
              </div>
            </div>
          )}

          {/* Resources */}
          {activeTab === "resources" && (
            <div>
              <h2 className="text-2xl font-serif text-stone-900 mb-6">
                學習資源
              </h2>
              <div className="space-y-6">
                {resources.map((resource, index) => (
                  <div
                    key={resource.id}
                    className="border border-stone-200 p-6 space-y-4"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="資源標題"
                        value={resource.title}
                        onChange={(e) => {
                          const updated = [...resources];
                          updated[index].title = e.target.value;
                          setResources(updated);
                        }}
                        className="px-3 py-2 border border-stone-200 focus:outline-none focus:border-stone-400"
                      />
                      <input
                        type="text"
                        placeholder="分類"
                        value={resource.category}
                        onChange={(e) => {
                          const updated = [...resources];
                          updated[index].category = e.target.value;
                          setResources(updated);
                        }}
                        className="px-3 py-2 border border-stone-200 focus:outline-none focus:border-stone-400"
                      />
                    </div>
                    <textarea
                      placeholder="描述"
                      value={resource.description}
                      onChange={(e) => {
                        const updated = [...resources];
                        updated[index].description = e.target.value;
                        setResources(updated);
                      }}
                      className="w-full px-3 py-2 border border-stone-200 focus:outline-none focus:border-stone-400"
                      rows={2}
                    />
                    <input
                      type="text"
                      placeholder="連結"
                      value={resource.link}
                      onChange={(e) => {
                        const updated = [...resources];
                        updated[index].link = e.target.value;
                        setResources(updated);
                      }}
                      className="w-full px-3 py-2 border border-stone-200 focus:outline-none focus:border-stone-400"
                    />
                    <input
                      type="text"
                      placeholder="圖片 URL"
                      value={resource.image}
                      onChange={(e) => {
                        const updated = [...resources];
                        updated[index].image = e.target.value;
                        setResources(updated);
                      }}
                      className="w-full px-3 py-2 border border-stone-200 focus:outline-none focus:border-stone-400"
                    />
                    <button
                      onClick={() => {
                        const updated = resources.filter((_, i) => i !== index);
                        setResources(updated);
                      }}
                      className="text-sm text-red-600 hover:underline"
                    >
                      刪除
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setResources([
                      ...resources,
                      {
                        id: Date.now().toString(),
                        title: "",
                        description: "",
                        category: "",
                        link: "",
                        image: "",
                      },
                    ]);
                  }}
                  className="px-6 py-2 bg-stone-900 text-white font-serif tracking-widest hover:bg-stone-800 transition"
                >
                  新增資源
                </button>
              </div>
            </div>
          )}

          {/* Deals */}
          {activeTab === "deals" && (
            <div>
              <h2 className="text-2xl font-serif text-stone-900 mb-6">
                好康分享
              </h2>
              <div className="space-y-6">
                {deals.map((deal, index) => (
                  <div
                    key={deal.id}
                    className="border border-stone-200 p-6 space-y-4"
                  >
                    <input
                      type="text"
                      placeholder="標題"
                      value={deal.title}
                      onChange={(e) => {
                        const updated = [...deals];
                        updated[index].title = e.target.value;
                        setDeals(updated);
                      }}
                      className="w-full px-3 py-2 border border-stone-200 focus:outline-none focus:border-stone-400"
                    />
                    <textarea
                      placeholder="描述"
                      value={deal.description}
                      onChange={(e) => {
                        const updated = [...deals];
                        updated[index].description = e.target.value;
                        setDeals(updated);
                      }}
                      className="w-full px-3 py-2 border border-stone-200 focus:outline-none focus:border-stone-400"
                      rows={2}
                    />
                    <input
                      type="text"
                      placeholder="連結"
                      value={deal.link}
                      onChange={(e) => {
                        const updated = [...deals];
                        updated[index].link = e.target.value;
                        setDeals(updated);
                      }}
                      className="w-full px-3 py-2 border border-stone-200 focus:outline-none focus:border-stone-400"
                    />
                    <input
                      type="text"
                      placeholder="圖片 URL"
                      value={deal.image}
                      onChange={(e) => {
                        const updated = [...deals];
                        updated[index].image = e.target.value;
                        setDeals(updated);
                      }}
                      className="w-full px-3 py-2 border border-stone-200 focus:outline-none focus:border-stone-400"
                    />
                    <button
                      onClick={() => {
                        const updated = deals.filter((_, i) => i !== index);
                        setDeals(updated);
                      }}
                      className="text-sm text-red-600 hover:underline"
                    >
                      刪除
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setDeals([
                      ...deals,
                      {
                        id: Date.now().toString(),
                        title: "",
                        description: "",
                        link: "",
                        image: "",
                      },
                    ]);
                  }}
                  className="px-6 py-2 bg-stone-900 text-white font-serif tracking-widest hover:bg-stone-800 transition"
                >
                  新增好康
                </button>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="pt-6 border-t border-stone-200">
            <button
              onClick={saveCourses}
              disabled={loading}
              className="px-8 py-3 bg-stone-900 text-white font-serif tracking-widest hover:bg-stone-800 transition disabled:opacity-50"
            >
              {loading ? "保存中..." : "保存所有變更"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
