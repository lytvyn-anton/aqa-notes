import { type Page, type Locator } from '@playwright/test'

export class LayoutComponent {
    readonly header: Locator
    readonly searchLink: Locator
    readonly signOutButton: Locator

    constructor(private readonly page: Page) {
        this.header = page.getByRole('banner')
        this.searchLink = page.getByRole('link', { name: 'Search' })
        this.signOutButton = page.getByRole('button', { name: 'Sign out' })
    }

    navLink(name: string): Locator {
        return this.header.getByRole('link', { name })
    }

    langButton(label: 'EN' | 'UA'): Locator {
        return this.page.getByRole('group', { name: /language/i }).getByRole('button', { name: label })
    }
}
