import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import Layout from '../components/Layout'
import { notes } from '../data/notes'

const mdComponents: React.ComponentProps<typeof ReactMarkdown>['components'] = {
  p: ({ children }) => (
    <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-bold text-white mt-8 mb-3">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-blue-300 mt-6 mb-2">{children}</h3>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-outside pl-5 space-y-1.5 mb-4 text-gray-300">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside pl-5 space-y-1.5 mb-4 text-gray-300">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  strong: ({ children }) => (
    <strong className="text-white font-semibold">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="text-gray-200 italic">{children}</em>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.includes('language-')
    if (isBlock) {
      return (
        <code className="block text-sm font-mono text-green-300 leading-relaxed">
          {children}
        </code>
      )
    }
    return (
      <code className="bg-gray-700 text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    )
  },
  pre: ({ children }) => (
    <pre className="bg-gray-950 border border-gray-700 rounded-xl p-4 overflow-x-auto mb-4 text-sm">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 my-4 text-gray-400 italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-gray-700 my-6" />,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
    >
      {children}
    </a>
  ),
}

function NotePage() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()

  const note = notes.find((n) => n.slug === slug)

  if (!note) {
    return (
      <Layout>
        <div>
          <Link to="/" className="text-gray-400 hover:text-white mb-6 inline-block">
            {t('category.back')}
          </Link>
          <h1 className="text-4xl font-bold text-red-400">
            {t('note.notFound')}
          </h1>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-5xl">
        <Link to={`/category/${note.category}`} className="text-gray-400 hover:text-white mb-6 inline-block">
          {t('category.back')}
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-4 mb-3">
              {note.image && (
                <img
                  src={note.image}
                  alt=""
                  className="w-10 h-10 object-contain shrink-0 mt-1 opacity-90"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
              )}
              <h1 className="text-4xl font-bold text-blue-400 leading-tight">
                {t(`data.notes.${note.slug}.title`, { defaultValue: note.title })}
              </h1>
            </div>

            <p className="text-gray-400 mb-4">
              {t(`data.notes.${note.slug}.description`, { defaultValue: note.description })}
            </p>

            <div className="flex flex-wrap gap-2 mb-8" aria-label="tags">
              {note.tags.map((tag) => (
                <span key={tag} className="text-xs bg-gray-700 text-blue-300 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>

            <article>
              <ReactMarkdown components={mdComponents}>
                {note.content}
              </ReactMarkdown>
            </article>
          </div>

          {/* ── Sidebar ── */}
          <aside className="lg:w-64 shrink-0 flex flex-col gap-5">
            {note.image && (
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex items-center justify-center">
                <img
                  src={note.image}
                  alt={note.title}
                  className="w-20 h-20 object-contain opacity-90"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).parentElement!.style.display = 'none' }}
                />
              </div>
            )}

            {note.docs && note.docs.length > 0 && (
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
                  Official Docs
                </h2>
                <ul className="flex flex-col gap-2">
                  {note.docs.map((doc) => (
                    <li key={doc.url}>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors group"
                      >
                        <svg className="w-3.5 h-3.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        {doc.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
                Category
              </h2>
              <Link to={`/category/${note.category}`} className="text-sm text-gray-300 hover:text-white transition-colors">
                ← More in this category
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  )
}

export default NotePage
