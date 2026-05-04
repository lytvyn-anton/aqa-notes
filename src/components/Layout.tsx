import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/AuthContext'

type LayoutProps = {
  children: React.ReactNode
}

type DropdownItem = {
  to: string
  label: string
  emoji?: string
  seeAll?: boolean
}

type NavLinkDef = {
  to: string
  label: string
  dropdown?: DropdownItem[]
}

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'uk', label: 'UA' },
]

const NAV_LINKS: NavLinkDef[] = [
  { to: '/', label: 'Home' },
  {
    to: '/automation-types',
    label: 'Automation Types',
    dropdown: [
      { to: '/category/web',         label: 'Web Automation',        emoji: '🌐' },
      { to: '/category/mobile',      label: 'Mobile Automation',     emoji: '📱' },
      { to: '/category/api',         label: 'API / Backend',         emoji: '🔌' },
      { to: '/category/performance', label: 'Performance',           emoji: '⚡' },
      { to: '/category/cicd',        label: 'CI/CD & Infrastructure',emoji: '🔧' },
      { to: '/automation-types',     label: 'See All',               seeAll: true },
    ],
  },
  {
    to: '/frameworks',
    label: 'Frameworks',
    dropdown: [
      { to: '/frameworks', label: 'Playwright',    emoji: '🎭' },
      { to: '/frameworks', label: 'Cypress',       emoji: '🌲' },
      { to: '/frameworks', label: 'Detox',         emoji: '🐳' },
      { to: '/frameworks', label: 'Appium',        emoji: '🐙' },
      { to: '/frameworks', label: 'k6',            emoji: '💨' },
      { to: '/frameworks', label: 'See All',       seeAll: true },
    ],
  },
  {
    to: '/tools',
    label: 'Tools',
    dropdown: [
      { to: '/tools', label: 'GitHub Actions', emoji: '🐙' },
      { to: '/tools', label: 'Docker',         emoji: '🐋' },
      { to: '/tools', label: 'Allure Report',  emoji: '📈' },
      { to: '/tools', label: 'TypeScript',     emoji: '🔷' },
      { to: '/tools', label: 'Git',            emoji: '🌿' },
      { to: '/tools', label: 'See All',        seeAll: true },
    ],
  },
  { to: '/about', label: 'About' },
]

const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'text-white font-medium transition-colors'
    : 'text-gray-400 hover:text-white transition-colors'

function Layout({ children }: LayoutProps) {
  const { t, i18n } = useTranslation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="sticky top-0 z-50 bg-gray-800 border-b border-gray-700 px-8 py-4 flex items-center justify-between">

        <Link to="/" className="text-xl font-bold text-blue-400 hover:text-blue-300 shrink-0">
          {t('header.title')}
        </Link>

        <nav className="flex items-center gap-6">
          {NAV_LINKS.map(({ to, label, dropdown }) =>
            dropdown ? (
              <div key={to} className="relative group">
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-1 transition-colors ${
                      isActive ? 'text-white font-medium' : 'text-gray-400 hover:text-white'
                    }`
                  }
                >
                  {label}
                  <svg className="w-3 h-3 mt-0.5 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </NavLink>

                {/* Dropdown panel */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:block">
                  <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden min-w-[200px]">
                    {dropdown.map((item) =>
                      item.seeAll ? (
                        <Link
                          key={item.to + item.label}
                          to={item.to}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-blue-400 hover:bg-gray-700 border-t border-gray-700 font-medium transition-colors"
                        >
                          <span className="text-xs">→</span>
                          {item.label}
                        </Link>
                      ) : (
                        <Link
                          key={item.to + item.label}
                          to={item.to}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                        >
                          {item.emoji && <span className="text-base">{item.emoji}</span>}
                          {item.label}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink key={to} to={to} end={to === '/'} className={navClass}>
                {label}
              </NavLink>
            )
          )}
        </nav>

        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-1" role="group" aria-label={t('header.languageSwitch')}>
            {LANGUAGES.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => i18n.changeLanguage(code)}
                className={`text-sm px-2 py-1 rounded transition-colors ${
                  i18n.language === code
                    ? 'text-blue-400 font-semibold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <Link
            to="/search"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label={t('header.searchLabel')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </Link>

          {user && (
            <div className="flex items-center gap-3 pl-3 border-l border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-gray-300 hidden sm:block">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-400 transition-colors text-xs"
                aria-label="Sign out"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                </svg>
              </button>
            </div>
          )}
        </div>

      </header>

      <main className="p-8">
        {children}
      </main>
    </div>
  )
}

export default Layout
