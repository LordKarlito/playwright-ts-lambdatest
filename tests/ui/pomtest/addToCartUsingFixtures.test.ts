import { test, expect } from "../pomfixtures/pomFixture";
import * as data from "../../../test-data/addToCart-test-data.json"

test.describe('POM tests', () => {
    test('Register test_01', async ({ page, baseURL, registerPage }) => {
        // const register = new RegisterPage(page);
        await page.goto(`${baseURL}?route=account/register`)
        await registerPage.enterFirstName(data.firstname);
        await registerPage.enterLastName(data.lastname);
        await registerPage.enterTelephone(data.phone_number);
        await registerPage.enterEmail(data.email);
        await registerPage.enterPassword(data.password);
        await registerPage.enterConfirmPassword(data.password); 

        expect(await registerPage.isSubscribeChecked()).toBe(false);

        await registerPage.clickTermsAndConditions();
        await registerPage.clickContinueToRegister();
    });

    test('Login test_02', async ({ page, baseURL, loginPage }) => {
        // const login = new LoginPage(page);
        await page.goto(`${baseURL}?route=account/login`);
        await loginPage.enterEmail(data.email)
        await loginPage.enterLoginPassword(data.password)
        await loginPage.clickLoginBtn();

        expect(await page.title()).toBe('My Account')

    });

    test('Add to cart test_03', async ({ page, baseURL, loginPage, homePage, productPage }) => {
        // const login = new LoginPage(page);
        // const homePage = new HomePage(page);
        // const productPage = new ProductPage(page);

        await page.goto(`${baseURL}?route=account/login`);
        await loginPage.login(data.email, data.password);
        await homePage.goToHomepage();
        await homePage.clickOnFirstProduct();

        await productPage.addFirstTopProductToCart();
        await expect(productPage.toast).toBeVisible();
        
    });
})