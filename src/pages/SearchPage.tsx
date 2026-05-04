import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Layout from '../components/Layout'
import NoteCard from '../components/NoteCard'
import { notes } from '../data/notes'

function SearchPage() {
  const [query, setQuery] = useState('')
  const { t } = useTranslation()

  const trimmed = query.trim().toLowerCase()

  const results = useMemo(() => {
    if (!trimmed) return []
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(trimmed) ||
        note.description.toLowerCase().includes(trimmed) ||
        note.content.toLowerCase().includes(trimmed) ||
        note.tags.some((tag) => tag.toLowerCase().includes(trimmed))
    )
  }, [trimmed])

  return (
    <Layout>
      <div>
        <h1 className="text-4xl font-bold text-blue-400 mb-6">{t('search.title')}</h1>

        <input
          type="text"
          placeholder={t('search.placeholder')}
          aria-label={t('search.title')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          className="w-full bg-gray-800 text-white p-4 rounded-lg mb-6 outline-none focus:ring-2 focus:ring-blue-400"
        />

        {trimmed && (
          <div>
            {results.length === 0 ? (
              <p className="text-gray-500">
                {t('search.noResults', { query })}
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                <p className="text-gray-400 text-sm mb-2">
                  {t('search.results', { count: results.length, query })}
                </p>
                {results.map((note) => (
                  <NoteCard key={note.slug} note={note} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default SearchPage
