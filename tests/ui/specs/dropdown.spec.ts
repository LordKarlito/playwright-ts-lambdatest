import { test, expect } from '@playwright/test';

test.describe('dropdowns', () => {
    test.beforeEach(async ({ page }) => {
        page.goto('https://www.lambdatest.com/selenium-playground/select-dropdown-demo');
    });
    

    test('select dropdown', async ({ page }) => {
        const myDropDown = page.locator('#select-demo')
        const message = page.locator('//*[@id="select-demo"]/following-sibling::p')
        await expect(message).toContainText('');

        await myDropDown.selectOption('Wednesday');
        await expect(message).toContainText('Day selected :- Wednesday');

        
        await myDropDown.selectOption('Sunday');
        await expect(message).toContainText('Day selected :- Sunday');
    });

    test('multi select', async ({page}) => {
        // Can also reference the select element inside the selectOption method.
        await page.selectOption('#multi-select', [
            'Florida',
            'New York',
            'Texas',
        ]);
    });
    
});

test.describe('jQuery select', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo');
    })

    test('with search: CLICK', async ({ page }) => {
        await page.click('#country+span');
        await page.getByRole('tree').getByRole('treeitem', {name: 'Japan'}).click();

        await expect(page.locator('#select2-country-container')).toContainText('Japan');
    });
    
    test('with search: TYPE', async ({ page }) => {
        await page.click('#country+span');
        await page.locator('.select2-dropdown > .select2-search > input').fill('New Zealand');
        await page.keyboard.press('Enter');

        await expect(page.locator('#select2-country-container')).toContainText('New Zealand');
    });

    test('multiple values with search', async ({ page }) => {
        await page.getByRole('combobox').nth(1).click();
        await page.getByRole('treeitem', { name: 'Arkansas' }).click()
        
        await page.getByRole('combobox').nth(1).click();
        
        await page.getByRole('textbox').fill('Califo');
        await page.keyboard.press('Enter');

        await expect(page.locator('.select2-selection__choice')).toContainText(['Arkansas', 'California'])
    })
    
    
    
    
});

