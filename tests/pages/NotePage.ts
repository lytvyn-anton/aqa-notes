import { type Page, type Locator } from '@playwright/test'
import { LayoutComponent } from '@components/LayoutComponent'
import { ROUTES } from '@helpers/routes'

export class NotePage {
    readonly layout: LayoutComponent
    readonly heading: Locator
    readonly backLink: Locator
    readonly tags: Locator
    readonly article: Locator

    constructor(private readonly page: Page) {
        this.layout = new LayoutComponent(page)
        this.heading = page.getByRole('heading', { level: 1 })
        this.backLink = page.getByRole('link', { name: '← Back' })
        this.tags = page.getByLabel('tags')
        this.article = page.getByRole('article')
    }

    async goto(slug: string) {
        await this.page.goto(ROUTES.note(slug))
    }
}
