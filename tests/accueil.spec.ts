import { test, expect } from '@playwright/test';
import { AmazonHomePage } from '../pages/AmazonHomePage';

test.describe('Amazon : parcours de base', () => {
  let home: AmazonHomePage;

  test.beforeEach(async ({ page }) => {
    home = new AmazonHomePage(page);
    await home.goto();
    test.skip(await home.isBlockedByCaptcha(), 'Page CAPTCHA détectée : test ignoré');
  });

  test('la page principale se charge @smoke', async ({ page }) => {
    await expect(page).toHaveTitle(/Amazon/i);
    await expect(home.searchBox).toBeVisible();
  });

  test('la recherche affiche des résultats @smoke', async ({ page }) => {
    await home.search('laptop');
    await expect(page).toHaveURL(/k=laptop/);
    await expect(home.results.first()).toBeVisible();
  });
});
