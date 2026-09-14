import Image from "next/image";
import Link from "next/link";
import {
  getHomepageConfig,
  getCourses,
  getResources,
  getDeals,
} from "@/lib/supabase";

export const revalidate = 300;

interface Course {
  id: string;
  name: string;
  day: string;
  level: string;
  time: string;
  available_spots: number;
  description: string;
  registration_link: string;
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

export default async function Home() {
  // 從 Supabase 讀取所有資料
  const [config, courses, resources, deals] = await Promise.all([
    getHomepageConfig(),
    getCourses(),
    getResources(),
    getDeals(),
  ]);

  // 預設配置
  const defaultConfig = {
    name: "蔚樺",
    korean_name: "웨이화",
    brand_name: "韓語蜂蜜罐",
    bio: "一位透過各種學習方式學韓文的台灣女子",
    avatar_url: "/images/avatar.jpg",
    line_link: "https://line.me/R/ti/p/@942pdsee",
    button1_text: "加入 LINE 預約一對一課程",
    button2_text: "查看目前開課班級",
    bg_color: "#faf8f3",
    button1_color: "#000000",
    button2_color: "#d3d3d3",
  };

  // 使用 Supabase 配置或預設值
  const pageConfig = config || defaultConfig;

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: pageConfig.bg_color }}
    >
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        {/* Header Section */}
        <div className="mb-24">
          {/* Avatar */}
          <div className="flex justify-center mb-16">
            <div className="avatar-circle w-32 h-32 flex items-center justify-center">
              <Image
                src={pageConfig.avatar_url}
                alt={pageConfig.name}
                width={128}
                height={128}
                className="w-28 h-28 rounded-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Title and Brand */}
          <div className="text-center mb-12">
            <div className="flex flex-col items-center gap-1 mb-8">
              <h1 className="text-5xl md:text-6xl font-serif text-stone-900">
                {pageConfig.name}
              </h1>
              <p className="text-sm text-stone-600 tracking-widest font-light">
                {pageConfig.korean_name}
              </p>
            </div>
            <div className="border-t border-stone-300 pt-8">
              <h2 className="text-2xl md:text-3xl font-serif text-stone-900 font-light">
                {pageConfig.brand_name}
              </h2>
            </div>
          </div>

          {/* Bio */}
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <p className="text-base text-stone-700 leading-relaxed font-light">
              {pageConfig.bio}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 max-w-sm mx-auto">
            <Link
              href={pageConfig.line_link}
              target="_blank"
              className="btn-elegant px-8 py-3 text-stone-50 text-center font-serif text-base tracking-widest transition duration-300 hover:opacity-80"
              style={{ backgroundColor: pageConfig.button1_color }}
            >
              {pageConfig.button1_text}
            </Link>
            <a
              href="#courses"
              className="btn-elegant px-8 py-3 text-stone-900 text-center font-serif text-base tracking-widest transition duration-300 hover:opacity-80"
              style={{ backgroundColor: pageConfig.button2_color }}
            >
              {pageConfig.button2_text}
            </a>
          </div>
        </div>

        {/* Courses Section */}
        {courses.length > 0 && (
          <section id="courses" className="mb-20">
            <div className="mb-12">
              <h2 className="text-3xl font-serif text-stone-900 mb-4">
                目前開課班級
              </h2>
              <div className="w-16 h-px bg-stone-400"></div>
            </div>

            <div className="space-y-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="pt-6 pb-6 border-b border-stone-200 last:border-b-0"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-3">
                    <div>
                      <h3 className="text-lg font-serif text-stone-900">
                        {course.day} · {course.level} · {course.name}
                      </h3>
                      <p className="text-sm text-stone-600 mt-1">
                        {course.time}
                      </p>
                    </div>
                    <span className="text-sm font-serif text-stone-600">
                      可插班 {course.available_spots} 人
                    </span>
                  </div>
                  {course.description && (
                    <p className="text-sm text-stone-600 mb-4">
                      {course.description}
                    </p>
                  )}
                  {course.registration_link && (
                    <Link
                      href={course.registration_link}
                      target="_blank"
                      className="inline-block text-sm font-serif text-stone-900 border-b-2 border-stone-900 hover:opacity-70 transition"
                    >
                      報名 →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Resources Section */}
        {resources.length > 0 && resources[0].id !== "1" && (
          <section id="resources" className="mb-20">
            <div className="mb-12">
              <h2 className="text-3xl font-serif text-stone-900 mb-4">
                學習資源
              </h2>
              <div className="w-16 h-px bg-stone-400"></div>
            </div>

            <div className="grid gap-8">
              {resources.map((resource) => (
                <Link
                  key={resource.id}
                  href={resource.link}
                  target="_blank"
                  className="block group"
                >
                  <div className="border border-stone-300 p-6 hover:border-stone-500 transition duration-300">
                    {resource.image && (
                      <div className="mb-4 overflow-hidden h-40">
                        <img
                          src={resource.image}
                          alt={resource.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>
                    )}
                    <div>
                      {resource.category && (
                        <p className="text-xs uppercase tracking-widest text-stone-600 mb-2">
                          {resource.category}
                        </p>
                      )}
                      <h3 className="font-serif text-lg text-stone-900 mb-2">
                        {resource.title}
                      </h3>
                      {resource.description && (
                        <p className="text-sm text-stone-600">
                          {resource.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Deals Section */}
        {deals.length > 0 && deals[0].id !== "1" && (
          <section id="deals" className="mb-20">
            <div className="mb-12">
              <h2 className="text-3xl font-serif text-stone-900 mb-4">
                好康分享
              </h2>
              <div className="w-16 h-px bg-stone-400"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {deals.map((deal) => (
                <Link
                  key={deal.id}
                  href={deal.link}
                  target="_blank"
                  className="block group"
                >
                  <div className="border border-stone-300 overflow-hidden hover:border-stone-500 transition duration-300">
                    {deal.image && (
                      <div className="overflow-hidden h-48">
                        <img
                          src={deal.image}
                          alt={deal.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-serif text-lg text-stone-900 mb-2">
                        {deal.title}
                      </h3>
                      {deal.description && (
                        <p className="text-sm text-stone-600">
                          {deal.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <div className="pt-16 border-t border-stone-300 text-center">
          <p className="text-xs text-stone-600 tracking-widest">
            © 2024 蔚樺 웨이화 | 韓語蜂蜜罐
          </p>
          <p className="text-xs text-stone-500 mt-3">
            <Link href="/admin" className="hover:text-stone-700 transition">
              後台管理
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
