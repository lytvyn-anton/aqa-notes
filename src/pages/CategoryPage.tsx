import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Layout from '../components/Layout'
import NoteCard from '../components/NoteCard'
import { categories } from '../data/categories'
import { notes } from '../data/notes'

function CategoryPage() {
  const { category: slug } = useParams<{ category: string }>()
  const { t } = useTranslation()

  const category = categories.find((c) => c.slug === slug)
  const categoryNotes = notes.filter((n) => n.category === slug)

  if (!category) {
    return (
      <Layout>
        <p className="text-red-400">{t('category.notFound')}</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <div>
        <Link to="/" className="text-gray-400 hover:text-white mb-6 inline-block">
          {t('category.back')}
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-400 mb-1">
            {category.emoji} {t(`data.categories.${category.slug}.title`, { defaultValue: category.title })}
          </h1>
          <p className="text-gray-400">{t(`data.categories.${category.slug}.description`, { defaultValue: category.description })}</p>
        </div>

        <ul className="flex flex-col gap-4" aria-label={t(`data.categories.${category.slug}.title`, { defaultValue: category.title })}>
          {categoryNotes.length === 0 ? (
            <li className="text-gray-500">{t('category.empty')}</li>
          ) : (
            categoryNotes.map((note) => (
              <li key={note.slug}>
                <NoteCard note={note} />
              </li>
            ))
          )}
        </ul>
      </div>
    </Layout>
  )
}

export default CategoryPage
