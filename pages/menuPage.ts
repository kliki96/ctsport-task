import { Page, expect } from '@playwright/test';

export class Menu {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openMenuAndDropdown() {
    const menuIcon = this.page
      .locator('.navbar__dropdown-primary-title')
      .first();
    await expect(menuIcon).toBeVisible();
    await menuIcon.click();
  }

  async goToCyklistika() {
    const cyclingLink = this.page.locator('a[href="/rubrika/cyklistika"]', {
      hasText: 'Cyklistika',
    });
    await expect(cyclingLink).toBeVisible();
    await cyclingLink.click();

    await expect(this.page).toHaveURL(
      'https://sport.ceskatelevize.cz/rubrika/cyklistika'
    );
    const heading = this.page.locator('h1');
    await expect(heading).toHaveText('Cyklistika');
  }
}
