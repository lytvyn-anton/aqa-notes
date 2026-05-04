import { type Page, type Locator } from '@playwright/test'
import { LayoutComponent } from '@components/LayoutComponent'
import { ROUTES } from '@helpers/routes'

export class NotFoundPage {
  readonly layout: LayoutComponent
  readonly heading: Locator
  readonly backLink: Locator

  constructor(private readonly page: Page) {
    this.layout = new LayoutComponent(page)
    this.heading = page.getByRole('heading', { name: '404', level: 1 })
    this.backLink = page.getByRole('link', { name: '← Back to home' })
  }

  async goto() {
    await this.page.goto(`${ROUTES.home}non-existent-page`)
  }
}
