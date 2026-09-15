import Image from "next/image";
import Link from "next/link";
import { siteConfig, courses, resources, deals, contact } from "@/lib/content";

export const revalidate = 300;

export default async function Home() {
  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: siteConfig.bgColor }}
    >
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        {/* Header Section */}
        <div className="mb-24">
          {/* Avatar */}
          <div className="flex justify-center mb-16">
            <div className="w-32 h-32 flex items-center justify-center">
              <Image
                src={siteConfig.avatarUrl}
                alt={siteConfig.name}
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
                {siteConfig.name}
              </h1>
              <p className="text-2xl md:text-3xl text-stone-600 tracking-widest font-light">
                {siteConfig.koreanName}
              </p>
            </div>
            <div className="border-t border-stone-300 pt-8">
              <h2 className="text-2xl md:text-3xl font-serif text-stone-900 font-light">
                {siteConfig.brandName}
              </h2>
            </div>
          </div>

          {/* Bio */}
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <p className="text-base text-stone-700 leading-relaxed font-light whitespace-pre-line">
              {siteConfig.bio}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 max-w-sm mx-auto">
            <Link
              href={siteConfig.lineLink}
              target="_blank"
              className="px-8 py-3 text-stone-50 text-center font-serif text-base tracking-widest transition duration-300 hover:opacity-80"
              style={{ backgroundColor: siteConfig.button1Color }}
            >
              {siteConfig.button1Text}
            </Link>
            <a
              href="#courses"
              className="px-8 py-3 text-stone-900 text-center font-serif text-base tracking-widest transition duration-300 hover:opacity-80"
              style={{ backgroundColor: siteConfig.button2Color }}
            >
              {siteConfig.button2Text}
            </a>
          </div>
        </div>

        {/* Courses Section - Card Style */}
        {courses.length > 0 && (
          <section id="courses" className="mb-20">
            <div className="mb-12">
              <h2 className="text-3xl font-serif text-stone-900 mb-4">
                目前開課班級
              </h2>
              <div className="w-16 h-px bg-stone-400"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="border border-stone-300 p-6 hover:border-stone-500 transition duration-300"
                >
                  <div className="mb-4">
                    <span className="text-xs uppercase tracking-widest text-stone-600 block mb-2">
                      {course.day} {course.time}
                    </span>
                    <h3 className="font-serif text-lg text-stone-900 mb-1">
                      {course.level} · {course.name}
                    </h3>
                  </div>

                  <p className="text-sm text-stone-600 mb-4 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-stone-600 font-serif">
                      {course.availableSpots === 0
                        ? "已滿班"
                        : `可插班 ${course.availableSpots} 人`}
                    </span>
                    {course.availableSpots > 0 && (
                      <Link
                        href={course.registrationLink}
                        target="_blank"
                        className="text-sm font-serif text-stone-900 border-b-2 border-stone-900 hover:opacity-70 transition"
                      >
                        報名 →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Resources Section - Card Style */}
        {resources.length > 0 && (
          <section id="resources" className="mb-20">
            <div className="mb-12">
              <h2 className="text-3xl font-serif text-stone-900 mb-4">
                學習資源
              </h2>
              <div className="w-16 h-px bg-stone-400"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="border border-stone-300 p-6 hover:border-stone-500 transition duration-300 text-center"
                >
                  <h3 className="font-serif text-lg text-stone-900 mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-stone-600">
                    {resource.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Deals Section - Card Style */}
        {deals.length > 0 && (
          <section id="deals" className="mb-20">
            <div className="mb-12">
              <h2 className="text-3xl font-serif text-stone-900 mb-4">
                好康分享
              </h2>
              <div className="w-16 h-px bg-stone-400"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {deals.map((deal) => (
                <div
                  key={deal.id}
                  className="border border-stone-300 p-6 hover:border-stone-500 transition duration-300 text-center"
                >
                  <h3 className="font-serif text-lg text-stone-900 mb-2">
                    {deal.title}
                  </h3>
                  <p className="text-sm text-stone-600">
                    {deal.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact Section - Card Style */}
        {contact && (
          <section id="contact" className="mb-20">
            <div className="mb-12">
              <h2 className="text-3xl font-serif text-stone-900 mb-4">
                {contact.title}
              </h2>
              <div className="w-16 h-px bg-stone-400"></div>
            </div>

            <div className="max-w-md mx-auto border border-stone-300 p-8 text-center">
              <p className="text-sm text-stone-600 mb-4 leading-relaxed">
                {contact.description}
              </p>
              <a
                href={`mailto:${contact.email}`}
                className="inline-block text-base font-serif text-stone-900 border-b-2 border-stone-900 hover:opacity-70 transition"
              >
                {contact.email}
              </a>
            </div>
          </section>
        )}

        {/* Footer */}
        <div className="pt-16 border-t border-stone-300 text-center">
          <p className="text-xs text-stone-600 tracking-widest">
            © 2026 蔚樺 웨이화 | 韓語蜂蜜罐
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
