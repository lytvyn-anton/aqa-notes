import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Layout from '../components/Layout'

function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-24">
        <h1 className="text-6xl font-bold text-red-400 mb-4">
          {t('notFound.title')}
        </h1>
        <p className="text-gray-400 text-xl mb-8">{t('notFound.subtitle')}</p>
        <Link to="/" className="text-blue-400 hover:text-blue-300 underline">
          {t('notFound.back')}
        </Link>
      </div>
    </Layout>
  )
}

export default NotFoundPage
