export const ROUTES = {
    home: '/',
    login: '/login',
    search: '/search',
    category: (slug: string) => `/category/${slug}`,
    note: (slug: string) => `/note/${slug}`,
}
