import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 699, height: 800 } }); // applies only to this file

test('should open hamburger menu and navigate to Cyklistika', async ({
  page,
}) => {
  await page.goto('https://sport.ceskatelevize.cz/');

  // Open hamburger menu
  const hamburgerIcon = page.locator('.navbar__dropdown-icon').first();
  await expect(hamburgerIcon).toBeVisible();
  await hamburgerIcon.click();

  // Open dropdown
  const dropdownTitle = page.locator('.navbar__dropdown-secondary-title');
  await expect(dropdownTitle).toBeVisible();
  await dropdownTitle.click();

  // Click on "Cyklistika" link
  const cyclingLink = page.locator('a[href="/rubrika/cyklistika"]', {
    hasText: 'Cyklistika',
  });
  await expect(cyclingLink).toBeVisible();
  await cyclingLink.click();

  // Assert we're on the Cyklistika page
  await expect(page).toHaveURL(
    'https://sport.ceskatelevize.cz/rubrika/cyklistika'
  );

  const heading = page.locator('h1');
  await expect(heading).toHaveText('Cyklistika');
});
