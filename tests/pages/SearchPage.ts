import { type Page, type Locator } from '@playwright/test'
import { LayoutComponent } from '@components/LayoutComponent'
import { ROUTES } from '@helpers/routes'

export class SearchPage {
    readonly layout: LayoutComponent
    readonly heading: Locator
    readonly searchInput: Locator
    readonly noResults: Locator

    constructor(private readonly page: Page) {
        this.layout = new LayoutComponent(page)
        this.heading = page.getByRole('heading', { name: 'Search', level: 1 })
        this.searchInput = page.getByRole('textbox', { name: 'Search' })
        this.noResults = page.getByText(/No results found/)
    }

    async goto() {
        await this.page.goto(ROUTES.search)
    }

    async search(query: string) {
        await this.searchInput.fill(query)
    }

    resultCard(name: string): Locator {
        return this.page.getByRole('link', { name })
    }
}
