import { test, expect } from "@playwright/test";
import RegisterPage from "../pages/registrationPage";
import LoginPage from "../pages/loginPage";
import HomePage from "../pages/homePage";
import ProductPage from "../pages/productPage";

test.describe('POM tests', () => {
    test('Register test_01', async ({ page, baseURL }) => {
        const register = new RegisterPage(page);
        await page.goto(`${baseURL}?route=account/register`)
        await register.enterFirstName('Karlo');
        await register.enterLastName('Barcelona');
        await register.enterTelephone('1234567890');
        await register.enterEmail(`${process.env.EMAIL}`);
        await register.enterPassword(`${process.env.PASS}`);
        await register.enterConfirmPassword(`${process.env.PASS}`); 

        expect(await register.isSubscribeChecked()).toBe(false);

        await register.clickTermsAndConditions();
        await register.clickContinueToRegister();
    });

    test('Login test_02', async ({ page, baseURL }) => {
        const login = new LoginPage(page);
        await page.goto(`${baseURL}?route=account/login`);
        await login.enterEmail(`${process.env.EMAIL}`)
        await login.enterLoginPassword(`${process.env.PASS}`)
        await login.clickLoginBtn();

        expect(await page.title()).toBe('My Account')

    });

    test('Add to cart test_03', async ({ page,baseURL }) => {
        const login = new LoginPage(page);
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);

        await page.goto(`${baseURL}?route=account/login`);
        await login.login(`${process.env.EMAIL}`, `${process.env.PASS}`);
        await homePage.goToHomepage();
        await homePage.clickOnFirstProduct();

        await productPage.addFirstTopProductToCart();

        const isToastVisible = await productPage.isToastVisible();
        expect(isToastVisible).toBeVisible();
        
    });
})

// SEE addToCartUsingFixtures.test.ts for json file implementation