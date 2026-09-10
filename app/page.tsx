"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, resourcesRes, dealsRes] = await Promise.all([
          fetch("/api/courses"),
          fetch("/api/resources"),
          fetch("/api/deals"),
        ]);

        if (coursesRes.ok) setCourses(await coursesRes.json());
        if (resourcesRes.ok) setResources(await resourcesRes.json());
        if (dealsRes.ok) setDeals(await dealsRes.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <Image
              src="/images/avatar.jpg"
              alt="웨이화"
              width={200}
              height={200}
              className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
            />
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            蔚樺 웨이화
          </h1>
          <p className="text-lg text-amber-600 font-semibold mb-4">
            韓語蜂蜜罐
          </p>

          {/* Bio */}
          <div className="space-y-2 text-slate-700 mb-8 leading-relaxed">
            <p>一位透過各種學習方式學韓文的台灣女子</p>
            <p>成均館交換 → 教育部獎學金 → 大邱大學語學堂結業</p>
            <p>
              現在，我用韓綜、美食和日常故事，把韓文變得有趣又好記
            </p>
            <p className="text-2xl">
              跟著我，蜂蜜罐裡的韓文秘訣等你來發現 🍯
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 mb-8">
            <Link
              href="https://line.me/R/ti/p/@942pdsee"
              target="_blank"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg transition transform hover:scale-105 text-lg"
            >
              💬 加入 LINE 預約一對一課程
            </Link>
            <a
              href="#courses"
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-6 rounded-lg transition transform hover:scale-105 text-lg"
            >
              📚 查看目前開課班級
            </a>
          </div>
        </div>

        {/* Courses Section */}
        {courses.length > 0 && (
          <section id="courses" className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              👨‍🏫 目前開課班級
            </h2>
            <div className="space-y-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border-l-4 border-amber-500"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {course.day} {course.level} {course.name}
                      </h3>
                      <p className="text-slate-600">⏰ {course.time}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      可插班 {course.availableSpots} 人
                    </span>
                  </div>
                  {course.description && (
                    <p className="text-slate-700 mb-4">{course.description}</p>
                  )}
                  {course.registrationLink && (
                    <Link
                      href={course.registrationLink}
                      target="_blank"
                      className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
                    >
                      報名
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Resources Section */}
        {resources.length > 0 && (
          <section id="resources" className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              📚 韓文學習資源
            </h2>
            <div className="grid gap-4">
              {resources.map((resource) => (
                <Link
                  key={resource.id}
                  href={resource.link}
                  target="_blank"
                  className="block"
                >
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 hover:scale-105 transform cursor-pointer border-l-4 border-purple-500">
                    <div className="flex items-start gap-4">
                      {resource.image && (
                        <div className="flex-shrink-0">
                          <img
                            src={resource.image}
                            alt={resource.title}
                            className="w-16 h-16 rounded object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 mb-1">
                          {resource.title}
                        </h3>
                        {resource.category && (
                          <p className="text-xs text-purple-600 font-semibold mb-2">
                            {resource.category}
                          </p>
                        )}
                        {resource.description && (
                          <p className="text-sm text-slate-600">
                            {resource.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Deals Section */}
        {deals.length > 0 && (
          <section id="deals" className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              🎁 好康分享
            </h2>
            <div className="grid gap-4">
              {deals.map((deal) => (
                <Link
                  key={deal.id}
                  href={deal.link}
                  target="_blank"
                  className="block"
                >
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 hover:scale-105 transform cursor-pointer border-l-4 border-pink-500">
                    {deal.image && (
                      <img
                        src={deal.image}
                        alt={deal.title}
                        className="w-full h-40 rounded mb-4 object-cover"
                      />
                    )}
                    <h3 className="font-bold text-slate-900 mb-2">
                      {deal.title}
                    </h3>
                    {deal.description && (
                      <p className="text-slate-600 text-sm">
                        {deal.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {loading && (
          <div className="text-center py-12">
            <p className="text-slate-600">載入中...</p>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center py-8 text-slate-500 border-t border-slate-200 mt-12">
          <p>© 2024 蔚樺 웨이화 | 韓語蜂蜜罐</p>
        </footer>
      </div>
    </div>
  );
}
