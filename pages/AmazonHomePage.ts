import { Page, Locator } from '@playwright/test';

export class AmazonHomePage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly results: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.locator('#twotabsearchtextbox');
    this.searchButton = page.locator('#nav-search-submit-button');
    this.results = page.locator('[data-component-type="s-search-result"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async isBlockedByCaptcha(): Promise<boolean> {
    const captchaForm = this.page.locator('form[action*="validateCaptcha"]');
    return (await captchaForm.count()) > 0;
  }

  async search(term: string): Promise<void> {
    await this.searchBox.fill(term);
    await this.searchButton.click();
  }
}
