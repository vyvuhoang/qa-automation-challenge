import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { SideBarSearch } from '../pages/dashBoard';

test.describe('Search Function Tests', () => {
    const menuItems = [
        'Admin',
        'PIM',
        'Leave',
        'Time',
        'Recruitment',
        'My Info',
        'Performance',
        'Dashboard',
        'Directory',
        'Maintenance',
        'Claim',
        'Buzz'
    ];
    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        await login.goto();
        await login.login('Admin', 'admin123');
    });

    test('Search "Admin" should return only "Admin"', async ({ page }) => {
        const search = new SideBarSearch(page);
        await search.search('Admin');
        const items = await search.getVisibleMenuItems();
        expect(items).toEqual(['Admin']);
    });

    test('Search "D" should return Admin, Dashboard, Directory', async ({ page }) => {
        const search = new SideBarSearch(page);
        await search.search('D');
        const items = await search.getVisibleMenuItems();
        expect(items.sort()).toEqual(['Admin', 'Dashboard', 'Directory'].sort());
    });

    test('Search with no matching string shows empty list', async ({ page }) => {
        const search = new SideBarSearch(page);
        await search.search('nothing');
        const items = await search.getVisibleMenuItems();
        expect(items).toEqual([]);
    });

    for (const item of menuItems) {
        test(`Searching "${item}" returns only "${item}"`, async ({ page }) => {
            const search = new SideBarSearch(page);
            await search.search(item);
            const items = await search.getVisibleMenuItems();
            expect(items).toEqual([item]);
        });
    }

    test('Clearing the search input restores full menu', async ({ page }) => {
        const search = new SideBarSearch(page);
        await search.search('D');
        const threeItems = await search.getVisibleMenuItems();
        expect(threeItems.sort()).toEqual(['Admin', 'Dashboard', 'Directory'].sort());
        await search.search('');  // put empty string to clear search string
        const items = await search.getVisibleMenuItems();
        expect(items).toContain('Admin');
        expect(items).toContain('Dashboard');
        expect(items).toContain('PIM');
    });
});