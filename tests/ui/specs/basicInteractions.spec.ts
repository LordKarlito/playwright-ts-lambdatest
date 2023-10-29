import { test, expect } from '@playwright/test';

test.describe("Playground Form Testing", () => {
  test('Test form input field', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/simple-form-demo`);
    const input1 = page.getByPlaceholder('Please enter first value');
    const input2 = page.getByPlaceholder('Please enter second value');

    const getValuesBtn = page.getByRole("button", { name: "Get Sum" })
    const result = page.locator("id=addmessage")

    let num1 = 121;
    let num2 = 546;

    await input1.fill(num1.toString());
    await input2.fill(num2.toString());

    await getValuesBtn.click();

    const sum = await result.innerText();
    expect(parseInt(sum)).toBe(num1 + num2) 

  });

  test('Checkbox', async ({ page, baseURL}) => {
    await page.goto(`${baseURL}/checkbox-demo`);
    
    const checkbox_1 = page.getByLabel('Click on check box');
    const isCheckedMessage = page.locator('id=txtAge');

    await expect(isCheckedMessage).not.toBeVisible();
    await checkbox_1.check();
    await expect(checkbox_1).toBeChecked();
    await expect(isCheckedMessage).toBeVisible();

    const enabledCheckbox1 = page.getByRole('checkbox').nth(1);
    const enabledCheckbox2 = page.locator('div').filter({ hasText: /^Disabled Checkbox DemoOption 1Option 2Option 3Option 4$/ }).getByRole('checkbox').nth(1);
    const disabledCheckbox1 = page.locator('div').filter({ hasText: /^Disabled Checkbox DemoOption 1Option 2Option 3Option 4$/ }).getByRole('checkbox').nth(2);
    const disabledCheckbox2 = page.getByRole('checkbox').nth(4);
    const checkAllBtn = page.getByRole('button', {name: 'Check All'})
    const uncheckAllBtn = page.getByRole('button', { name: 'Uncheck All' })

    await expect(enabledCheckbox1).toBeEnabled();
    await expect(enabledCheckbox2).not.toBeDisabled();
    await expect(disabledCheckbox1).toBeDisabled();
    await expect(disabledCheckbox2).not.toBeEnabled();

    const multipleCheckbox1 = page.locator('div').filter({hasText: 'Multiple Checkbox Demo'}).nth(5).getByRole("checkbox").nth(0);
    const multipleCheckbox2 = page.locator('div').filter({hasText: 'Multiple Checkbox Demo'}).nth(5).getByRole("checkbox").nth(1);
    const multipleCheckbox3 = page.locator('div').filter({hasText: 'Multiple Checkbox Demo'}).nth(5).getByRole("checkbox").nth(2);
    const multipleCheckbox4 = page.locator('div').filter({hasText: 'Multiple Checkbox Demo'}).nth(5).getByRole("checkbox").nth(3);

    await checkAllBtn.click();
    
    await expect(multipleCheckbox1).toBeChecked();
    await expect(multipleCheckbox2).toBeChecked();
    await expect(multipleCheckbox3).toBeChecked();
    await expect(multipleCheckbox4).toBeChecked();

    await uncheckAllBtn.click();
    
    await expect(multipleCheckbox1).not.toBeChecked();
    await expect(multipleCheckbox2).not.toBeChecked();
    await expect(multipleCheckbox3).not.toBeChecked();
    await expect(multipleCheckbox4).not.toBeChecked();
  })
})


