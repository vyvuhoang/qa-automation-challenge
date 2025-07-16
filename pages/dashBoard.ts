import { Page, Locator } from '@playwright/test';

export class SideBarSearch {
    private searchInput: Locator;
    private menuItemNames: Locator;

    /**
     * Represent side bar search component.
     * @param page page instance, already logged in and on Dashboard
     */
    constructor(private page: Page) {
        this.searchInput = page.locator('input[placeholder="Search"]');
        this.menuItemNames = page.locator('.oxd-main-menu-item-wrapper .oxd-main-menu-item--name');
    }

    /**
     * Filters the sidebar menu by typing into the search box.
     * @param keyword Substring to filter by
     */
    async search(keyword: string) {
        await this.searchInput.fill(keyword);
    }

    /**
     * Returns the text of only those menu items whose elements are visible.
     */
    async getVisibleMenuItems(): Promise<string[]> {
        const handles = await this.menuItemNames.elementHandles();
        const items: string[] = [];
        for (const handle of handles) {
            if (await handle.isVisible()) {
                const text = await handle.textContent() ?? '';
                items.push(text.trim());
            }
        }
        return items;
    }
}