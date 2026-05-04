import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Layout from '../components/Layout'
import CategoryCard from '../components/CategoryCard'
import { categories } from '../data/categories'
import { notes } from '../data/notes'

function HomePage() {
  const { t } = useTranslation()

  const featured = categories.slice(0, 2)
  const rest = categories.slice(2)

  const noteCounts = useMemo(
    () => new Map(categories.map((c) => [c.slug, notes.filter((n) => n.category === c.slug).length])),
    []
  )

  return (
    <Layout>
      <div>

        {/* Hero section */}
        <div className="relative overflow-hidden rounded-2xl mb-10 px-10 py-14">
          {/* gradient background */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #0a1628 0%, #0f2d54 40%, #112240 70%, #0a1628 100%)',
            }}
          />
          {/* dot grid overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle, #60a5fa 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          {/* glow blobs */}
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-600 rounded-full opacity-10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-indigo-500 rounded-full opacity-10 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">🧪</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 border border-blue-700 px-3 py-1 rounded-full">
                AQA Knowledge Base
              </span>
            </div>
            <h1 className="text-5xl font-extrabold text-white mb-4 leading-tight">
              {t('home.title')}
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl leading-relaxed mb-6">
              A structured reference for Automation QA engineers — covering web, mobile, API, and performance testing.
              Find frameworks, tools, patterns, and CI/CD tips all in one place.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Playwright', 'Detox', 'k6', 'GitHub Actions', 'Allure', 'TypeScript'].map((tag) => (
                <span key={tag} className="text-sm bg-blue-900/60 text-blue-300 border border-blue-700 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <section aria-label="Browse by Category">
          <h2 className="text-lg font-semibold text-gray-300 mb-4">Browse by Category</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {featured.map((category) => (
              <CategoryCard
                key={category.slug}
                category={category}
                noteCount={noteCounts.get(category.slug) ?? 0}
                size="lg"
              />
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {rest.map((category) => (
              <CategoryCard
                key={category.slug}
                category={category}
                noteCount={noteCounts.get(category.slug) ?? 0}
                size="sm"
              />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default HomePage
