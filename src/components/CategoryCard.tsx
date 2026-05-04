import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { type Category } from '../data/categories'

export type CategoryCardSize = 'sm' | 'md' | 'lg'

type CategoryCardProps = {
  category: Category
  noteCount: number
  size?: CategoryCardSize
}

const sizeStyles: Record<CategoryCardSize, string> = {
  sm: 'p-3 text-sm',
  md: 'p-4 text-base',
  lg: 'p-6 text-lg',
}

const emojiSizeStyles: Record<CategoryCardSize, string> = {
  sm: 'text-xl mb-2',
  md: 'text-2xl mb-2',
  lg: 'text-3xl mb-3',
}

const titleSizeStyles: Record<CategoryCardSize, string> = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-xl',
}

function CategoryCard({ category, noteCount, size = 'lg' }: CategoryCardProps) {
  const { t } = useTranslation()

  return (
    <Link to={`/category/${category.slug}`}>
      <div className={`bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer h-full ${sizeStyles[size]}`}>
        <div className={emojiSizeStyles[size]}>{category.emoji}</div>
        <h2 className={`font-bold text-white mb-1 ${titleSizeStyles[size]}`}>
          {t(`data.categories.${category.slug}.title`, { defaultValue: category.title })}
        </h2>
        <p className="text-gray-400 text-sm mb-3">
          {t(`data.categories.${category.slug}.description`, { defaultValue: category.description })}
        </p>
        <span className="text-xs text-blue-400 font-medium">
          {t('categoryCard.noteCount', { count: noteCount })}
        </span>
      </div>
    </Link>
  )
}

export default CategoryCard