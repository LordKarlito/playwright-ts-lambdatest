import { test, expect } from '@playwright/test';

test.describe('Handling dialogs', () => {
  test.beforeEach(async ({page, baseURL}) => {
    await page.goto(`${baseURL}/javascript-alert-box-demo`);
  });

  test('alerts', async ({ page }) => {

    const alertBtn = page.locator('p').filter({ hasText: 'JavaScript AlertsClick Me' }).getByRole('button');
    const alertMessage = 'I am an alert box!';
    let dialogMessage = ''

    page.on('dialog', dialog => {
      dialogMessage = dialog.message();
      dialog.accept();
    });

    await alertBtn.click();
    expect(dialogMessage).toBe(alertMessage);
  });

  test('confirm - accept', async ({ page }) => {

    page.on('dialog', dialog => {
      dialog.accept();
    });
    
    const confirmBtn = page.locator('p').filter({ hasText: 'Confirm box:Click Me' }).getByRole('button');
    const confirmMessage = page.locator('id=confirm-demo');

    await expect(confirmMessage).toBeHidden();

    await confirmBtn.click();

    await expect(confirmMessage).toBeVisible();
    await expect(confirmMessage).toHaveText('You pressed OK!');

  });
  test('confirm - dismiss', async ({ page }) => {

    page.on('dialog', dialog => {
      dialog.dismiss();
      
    });
    
    const confirmBtn = page.locator('p').filter({ hasText: 'Confirm box:Click Me' }).getByRole('button');
    const confirmMessage = page.locator('id=confirm-demo');

    await expect(confirmMessage).toBeHidden();

    await confirmBtn.click();

    await expect(confirmMessage).toBeVisible();
    await expect(confirmMessage).toHaveText('You pressed Cancel!');

  });

  test('prompt - OK: with name',async ({page}) => {
    page.on('dialog', dialog => {
      dialog.accept(name);
    });

    const name = 'karlo';
    
    const promptBtn = page.locator('p').filter({ hasText: 'Prompt box:Click Me' }).getByRole('button');
    const promptMessage = page.locator('id=prompt-demo');
    
    await expect(promptMessage).toBeHidden();
    await promptBtn.click();

    await expect(promptMessage).toHaveText(`You have entered '${name}' !`);
  });

  test('prompt - CANCEL',async ({page}) => {
    page.on('dialog', dialog => {
      dialog.dismiss();
    });
    
    const promptBtn = page.locator('p').filter({ hasText: 'Prompt box:Click Me' }).getByRole('button');
    const promptMessage = page.locator('id=prompt-demo');
    
    await expect(promptMessage).toBeHidden();
    await promptBtn.click();
    await expect(promptMessage).toBeHidden();
  });
});

test.describe('Bootstrap Modals', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    page.goto(`${baseURL}/bootstrap-modal-demo`);
  })

  test('single modal', async ({ page }) => {
    const modal = page.locator('id=myModal');

    await expect(modal).toBeHidden();
    await page.getByRole('button', { name: 'Launch Modal' }).first().click();
    await expect(modal).toBeVisible();
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(modal).toBeHidden();
    await page.getByRole('button', { name: 'Launch Modal' }).first().click();
    await expect(modal).toBeVisible();
    await page.getByRole('button', { name: 'Save Changes' }).click();
    await expect(modal).toBeHidden();

  });

  test('multiple modal', async ({ page }) => {
    const modal1 = page.locator('id=myMultiModal');
    const modal2 = page.locator('id=mySecondModal');

    
    await page.getByRole('button', { name: 'Launch Modal' }).nth(1).click();
    await expect(modal1).toBeVisible();
    await page.locator('#myMultiModal').getByRole('button', {name:'Launch Modal'}).click();
    await expect(modal2).toBeVisible();
    await page.locator('#mySecondModal').getByRole('button', { name: 'Save Changes' }).click();
    await expect(modal2).toBeHidden();
    await page.locator('#myMultiModal').getByRole('button', {name:'Save Changes'}).click();
    await expect(modal1).toBeHidden();
  })
  
  
  
})
