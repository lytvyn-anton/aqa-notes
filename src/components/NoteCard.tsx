import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { type Note } from '../data/notes'

type NoteCardProps = {
  note: Note
}

function NoteCard({ note }: NoteCardProps) {
  const { t } = useTranslation()
  return (
    <Link to={`/note/${note.slug}`}>
      <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
        <h2 className="text-lg font-bold text-white mb-1">
          {t(`data.notes.${note.slug}.title`, { defaultValue: note.title })}
        </h2>
        <p className="text-gray-400 text-sm mb-3">
          {t(`data.notes.${note.slug}.description`, { defaultValue: note.description })}
        </p>
        <div className="flex flex-wrap gap-2" aria-label="tags">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-700 text-blue-300 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default NoteCard