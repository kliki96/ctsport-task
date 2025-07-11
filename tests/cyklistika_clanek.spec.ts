import { test, expect } from '@playwright/test';
import { Menu } from '../pages/menuPage';

test('should open Cyklistika, assert date, open article, check author and related articles', async ({
  page,
}) => {
  const menu = new Menu(page);

  await page.goto('https://sport.ceskatelevize.cz/');

  // open hamburger menu and go to Cyklistika
  await menu.openMenuAndDropdown();
  await menu.goToCyklistika();

  // check that all articles have a date
  const articlesCount = await page.locator('.article-link__title').count();
  const dates = page.locator(
    'time[itemprop="datePublished"], time[itemprop="dateModified"]'
  );
  expect(await dates.count()).toBeGreaterThanOrEqual(articlesCount);

  // Fallback: loop over articles and click the first non-video one
  // open the first 'not video' article
  //   const articles = page.locator('.article-link');
  //   const count = await articles.count();

  //   for (let i = 0; i < count; i++) {
  //     const article = articles.nth(i);
  //     const hasVideoIcon = await article.locator('.icon--video').count();
  //     console.log(hasVideoIcon);

  //   if (hasVideoIcon === 0) {
  //     await article.click();
  //     break;
  //   }
  //   }

  // instead of the above
  await page.goto(
    'https://sport.ceskatelevize.cz/clanek/cyklistika/tour-de-france/tour-de-france-2025/1-etapa-tour-startuje-v-severofrancouzskem-lille-kdo-jako-prvni-oblekne-zlutou/6867c20f1ab93781d48facf1'
  );

  // check author and source
  const author = page.locator('[itemprop="author"]');
  await expect(author).toBeVisible();
  await expect(author).toHaveText(/\S/);

  const source = page.locator('.caption__source');
  await expect(source).toBeVisible();
  await expect(source).toHaveText(/\S/);

  // find 'souvisejici clanky' and click, if exists
  const related = page.locator('.related-articles');

  if ((await related.count()) > 0) {
    const firstItem = related.locator('.box__title-link').first();
    await firstItem.click();
  }

  // check if the category is Cyklistika
  const firstCategory = page.locator('.breadcrumb a').first();
  await expect(firstCategory).toHaveText('Cyklistika');
});
