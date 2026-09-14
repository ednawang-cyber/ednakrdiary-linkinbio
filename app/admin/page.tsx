"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HomepageConfig } from "@/lib/supabase";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("homepage");
  const [config, setConfig] = useState<HomepageConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

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
      const response = await fetch("/api/homepage-config");
      if (response.ok) {
        const data = await response.json();
        setConfig(data);
      }
    } catch (error) {
      console.error("Error loading config:", error);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!config) return;

    setSaving(true);
    try {
      const response = await fetch("/api/homepage-config", {
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

      if (response.ok) {
        alert("保存成功！");
      } else {
        alert("保存失敗");
      }
    } catch (error) {
      alert("保存出錯");
    }
    setSaving(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    localStorage.removeItem("linkinbio_admin_auth");
  };

  // 登入頁面
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
            className="space-y-4 bg-white p-8 border border-stone-300"
          >
            <div>
              <label className="block text-sm font-serif text-stone-900 mb-2">
                管理員密碼
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-stone-300 focus:outline-none focus:border-stone-600"
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

  // 主頁面
  return (
    <main className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-stone-300">
          <div>
            <h1 className="text-3xl font-serif text-stone-900">後台管理</h1>
            <p className="text-stone-600 mt-1">蔚樺 웨이화 | 韓語蜂蜜罐</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-stone-900 text-white text-sm hover:bg-stone-800 transition"
          >
            登出
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-stone-300">
          <button
            onClick={() => setActiveTab("homepage")}
            className={`px-4 py-3 font-serif border-b-2 transition ${
              activeTab === "homepage"
                ? "border-stone-900 text-stone-900"
                : "border-transparent text-stone-600 hover:text-stone-900"
            }`}
          >
            首頁配置
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`px-4 py-3 font-serif border-b-2 transition ${
              activeTab === "preview"
                ? "border-stone-900 text-stone-900"
                : "border-transparent text-stone-600 hover:text-stone-900"
            }`}
          >
            預覽
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-stone-600">加載中...</p>
          </div>
        ) : config ? (
          <>
            {/* 首頁配置 Tab */}
            {activeTab === "homepage" && (
              <div className="grid md:grid-cols-2 gap-8">
                {/* 編輯表單 */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-serif text-stone-900 mb-2">
                      名字
                    </label>
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
                    <label className="block text-sm font-serif text-stone-900 mb-2">
                      韓文名
                    </label>
                    <input
                      type="text"
                      value={config.korean_name}
                      onChange={(e) =>
                        setConfig({ ...config, korean_name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-stone-300 focus:outline-none focus:border-stone-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-serif text-stone-900 mb-2">
                      品牌名
                    </label>
                    <input
                      type="text"
                      value={config.brand_name}
                      onChange={(e) =>
                        setConfig({ ...config, brand_name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-stone-300 focus:outline-none focus:border-stone-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-serif text-stone-900 mb-2">
                      自我介紹
                    </label>
                    <textarea
                      value={config.bio}
                      onChange={(e) =>
                        setConfig({ ...config, bio: e.target.value })
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-stone-300 focus:outline-none focus:border-stone-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-serif text-stone-900 mb-2">
                      LINE 連結
                    </label>
                    <input
                      type="text"
                      value={config.line_link}
                      onChange={(e) =>
                        setConfig({ ...config, line_link: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-stone-300 focus:outline-none focus:border-stone-600"
                      placeholder="https://line.me/R/ti/p/..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-serif text-stone-900 mb-2">
                      按鈕 1 文案
                    </label>
                    <input
                      type="text"
                      value={config.button1_text}
                      onChange={(e) =>
                        setConfig({ ...config, button1_text: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-stone-300 focus:outline-none focus:border-stone-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-serif text-stone-900 mb-2">
                      按鈕 2 文案
                    </label>
                    <input
                      type="text"
                      value={config.button2_text}
                      onChange={(e) =>
                        setConfig({ ...config, button2_text: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-stone-300 focus:outline-none focus:border-stone-600"
                    />
                  </div>

                  {/* 顏色選擇 */}
                  <div className="pt-4 border-t border-stone-300">
                    <h3 className="font-serif text-stone-900 mb-4">配色設計</h3>

                    <div>
                      <label className="block text-sm font-serif text-stone-900 mb-2">
                        背景色
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          value={config.bg_color}
                          onChange={(e) =>
                            setConfig({ ...config, bg_color: e.target.value })
                          }
                          className="w-12 h-10 border border-stone-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={config.bg_color}
                          onChange={(e) =>
                            setConfig({ ...config, bg_color: e.target.value })
                          }
                          className="flex-1 px-3 py-2 border border-stone-300 focus:outline-none focus:border-stone-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-serif text-stone-900 mb-2 mt-3">
                        按鈕 1 顏色
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          value={config.button1_color}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              button1_color: e.target.value,
                            })
                          }
                          className="w-12 h-10 border border-stone-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={config.button1_color}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              button1_color: e.target.value,
                            })
                          }
                          className="flex-1 px-3 py-2 border border-stone-300 focus:outline-none focus:border-stone-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-serif text-stone-900 mb-2 mt-3">
                        按鈕 2 顏色
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          value={config.button2_color}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              button2_color: e.target.value,
                            })
                          }
                          className="w-12 h-10 border border-stone-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={config.button2_color}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              button2_color: e.target.value,
                            })
                          }
                          className="flex-1 px-3 py-2 border border-stone-300 focus:outline-none focus:border-stone-600"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full py-3 bg-stone-900 text-white font-serif tracking-widest hover:bg-stone-800 disabled:opacity-50 transition mt-6"
                  >
                    {saving ? "保存中..." : "保存設定"}
                  </button>
                </div>

                {/* 實時預覽 */}
                <div className="bg-white p-6 border border-stone-300 rounded sticky top-8">
                  <h3 className="font-serif text-stone-900 mb-4">實時預覽</h3>
                  <div
                    className="p-8 text-center rounded"
                    style={{ backgroundColor: config.bg_color }}
                  >
                    <div className="mb-6 flex justify-center">
                      <div className="w-24 h-24 bg-stone-300 rounded-full flex items-center justify-center text-stone-600">
                        頭像
                      </div>
                    </div>

                    <h1 className="text-4xl font-serif text-stone-900 mb-1">
                      {config.name}
                    </h1>
                    <p className="text-sm text-stone-600 mb-4">
                      {config.korean_name}
                    </p>

                    <div className="border-t border-stone-300 pt-4 mb-6">
                      <h2 className="text-2xl font-serif text-stone-900">
                        {config.brand_name}
                      </h2>
                    </div>

                    <p className="text-sm text-stone-700 mb-6">
                      {config.bio}
                    </p>

                    <div className="space-y-2">
                      <button
                        style={{ backgroundColor: config.button1_color }}
                        className="w-full py-2 text-white text-sm"
                      >
                        {config.button1_text}
                      </button>
                      <button
                        style={{ backgroundColor: config.button2_color }}
                        className="w-full py-2 text-stone-900 text-sm"
                      >
                        {config.button2_text}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 預覽 Tab */}
            {activeTab === "preview" && (
              <div className="bg-white p-8 border border-stone-300 rounded">
                <iframe
                  src="/"
                  className="w-full h-screen border-0 rounded"
                  title="首頁預覽"
                />
              </div>
            )}
          </>
        ) : null}
      </div>
    </main>
  );
}
