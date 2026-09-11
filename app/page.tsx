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

async function getContent() {
  try {
    // Try to fetch from Notion API first
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/content`, {
      cache: "no-store",
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!response.ok) {
      throw new Error("Failed to fetch from API");
    }

    return await response.json();
  } catch (error) {
    console.error("Error loading content:", error);

    // Fallback to JSON file if API fails
    try {
      const content = await import("@/data/content.json");
      return content.default;
    } catch (fallbackError) {
      console.error("Error loading fallback content:", fallbackError);
      return { courses: [], resources: [], deals: [] };
    }
  }
}

export default async function Home() {
  const data = await getContent();
  const courses: Course[] = data.courses || [];
  const resources: Resource[] = data.resources || [];
  const deals: Deal[] = data.deals || [];

  return (
    <main className="min-h-screen bg-stone-50">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        {/* Header Section */}
        <div className="mb-20">
          {/* Avatar */}
          <div className="flex justify-center mb-12">
            <div className="avatar-circle w-32 h-32 flex items-center justify-center">
              <Image
                src="/images/avatar.jpg"
                alt="蔚樺"
                width={128}
                height={128}
                className="w-28 h-28 rounded-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Title and Brand */}
          <div className="text-center mb-10">
            <h1 className="text-5xl md:text-6xl font-serif text-stone-900 mb-2">
              蔚樺
            </h1>
            <p className="text-lg text-stone-600 tracking-widest font-light">
              웨이화
            </p>
            <div className="mt-6 pt-6 border-t border-stone-200">
              <h2 className="text-2xl md:text-3xl font-serif text-stone-800">
                韓語蜂蜜罐
              </h2>
            </div>
          </div>

          {/* Bio */}
          <div className="prose prose-stone max-w-none text-center mb-12">
            <p className="text-base md:text-lg text-stone-700 leading-relaxed font-light">
              一位透過各種學習方式學韓文的台灣女子
            </p>
            <p className="text-sm text-stone-600 leading-relaxed font-light mb-6">
              成均館交換 · 教育部獎學金 · 大邱大學語學堂結業
            </p>
            <p className="text-base md:text-lg text-stone-700 leading-relaxed font-light">
              現在，我用韓綜、美食和日常故事，<br />
              把韓文變得有趣又好記
            </p>
            <p className="text-base text-stone-600 leading-relaxed font-light mt-6">
              跟著我，蜂蜜罐裡的韓文秘訣等你來發現 🍯
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 max-w-sm mx-auto">
            <Link
              href="https://line.me/R/ti/p/@942pdsee"
              target="_blank"
              className="btn-elegant px-8 py-4 bg-stone-900 text-stone-50 text-center font-serif text-lg tracking-widest hover:bg-stone-800"
            >
              加入 LINE
            </Link>
            <a
              href="#courses"
              className="btn-elegant px-8 py-4 bg-stone-100 text-stone-900 text-center font-serif text-lg tracking-widest hover:bg-stone-200"
            >
              查看課程
            </a>
          </div>
        </div>

        {/* Courses Section */}
        {courses.length > 0 && (
          <section id="courses" className="mb-20">
            <div className="mb-12">
              <h2 className="text-3xl font-serif text-stone-900 mb-2">
                目前開課班級
              </h2>
              <div className="w-12 h-1 bg-gradient-to-r from-stone-900 to-stone-300"></div>
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
                      可插班 {course.availableSpots} 人
                    </span>
                  </div>
                  {course.description && (
                    <p className="text-sm text-stone-600 mb-4">
                      {course.description}
                    </p>
                  )}
                  {course.registrationLink && (
                    <Link
                      href={course.registrationLink}
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
              <h2 className="text-3xl font-serif text-stone-900 mb-2">
                學習資源
              </h2>
              <div className="w-12 h-1 bg-gradient-to-r from-stone-900 to-stone-300"></div>
            </div>

            <div className="grid gap-6">
              {resources.map((resource) => (
                <Link
                  key={resource.id}
                  href={resource.link}
                  target="_blank"
                  className="block group"
                >
                  <div className="border border-stone-200 p-6 hover:border-stone-400 transition">
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
              <h2 className="text-3xl font-serif text-stone-900 mb-2">
                好康分享
              </h2>
              <div className="w-12 h-1 bg-gradient-to-r from-stone-900 to-stone-300"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {deals.map((deal) => (
                <Link
                  key={deal.id}
                  href={deal.link}
                  target="_blank"
                  className="block group"
                >
                  <div className="border border-stone-200 overflow-hidden hover:border-stone-400 transition">
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
        <div className="pt-12 border-t border-stone-200 text-center">
          <p className="text-sm text-stone-600">
            © 2024 蔚樺 웨이화 | 韓語蜂蜜罐
          </p>
          <p className="text-xs text-stone-500 mt-2">
            <Link href="/admin" className="hover:underline">
              後台管理
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
