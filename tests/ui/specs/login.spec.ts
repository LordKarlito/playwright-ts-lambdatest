import { chromium, expect, test } from '@playwright/test'

test("login test demo", async ()=> {

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://ecommerce-playground.lambdatest.io')
    await page.getByRole('button', { name: ' My account' }).hover();
    await page.getByRole('link', { name: 'Login', exact: true }).click()

    await page.getByPlaceholder('E-Mail Address').fill(`${process.env.EMAIL}`)
    await page.getByPlaceholder('Password').fill(`${process.env.PASS}`)
    await page.getByRole('button', { name: 'Login' }).click();

    
    await page.getByRole('button', { name: ' My account' }).hover();
    await expect(page.getByRole('link', { name: 'Logout', exact: true })).toBeVisible()
})