import { test, expect } from '@playwright/test';

test.describe('Frame Handling', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/iframe-demo/')
  });
  
  test('simple iFrame', async ({ page }) => {

    const myTextBox = page.locator('div').filter({ hasText: /^Simple iFrame containing Editor$/ }).frameLocator('iframe').locator('//div[contains(@class, "rsw-ce")]');
    await myTextBox.fill('Hello World!');

    await expect(myTextBox).toContainText('Hello World!');
  })

  test('iframe containing webpage', async ({ page }) => {
    const mySecondFrameTitle = page.frameLocator('#myiFrame').getByRole('heading', { name: 'LambdaTest Support and Knowledge Base' });
    
    await expect(mySecondFrameTitle).toBeVisible();
  })
  
  
});
