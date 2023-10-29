import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['json', {outputFile: 'test-results.json'}],
    ['html'],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'https://ecommerce-playground.lambdatest.io/index.php',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      testDir: './tests/ui/specs',
      use: { 
      baseURL: 'https://www.lambdatest.com/selenium-playground',
        ...devices['Desktop Chrome'] 
      },
    },

    {
      name: 'firefox',
      testDir: './tests/ui/specs',
      use: { 
        baseURL: 'https://www.lambdatest.com/selenium-playground',
        ...devices['Desktop Firefox'] 
      },
    },
    {
      name: 'webkit',
      testDir: './tests/ui/specs',
      use: { 
        baseURL: 'https://www.lambdatest.com/selenium-playground/',
        ...devices['Desktop Safari'] 
      },
    },
    {
      name: 'POM',
      testDir: './tests/ui/pomtest',
      use: {
        baseURL: 'https://ecommerce-playground.lambdatest.io/index.php',
        ...devices['Desktop Chrome'],
      }
    },
    {
      name: 'API-test',
      testDir: './tests/api/',
      testMatch: ['apiBasics.spec.ts'],
      use: {
        baseURL: 'https://jsonplaceholder.typicode.com',
      },
    },
    {
      name: 'MonHunAPI',
      testDir: './tests/api',
      testMatch: ['monsterHunterApi.spec.ts'],
      use: {
        baseURL: 'https://mhw-db.com'
      }
    },
    {
      name: 'gitHubAPI',
      testDir: './tests/api',
      testMatch: ['githubAPI.spec.ts'],
      use: {
        baseURL: 'https://api.github.com',
        extraHTTPHeaders: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${process.env.APIKEY}`,
        }
      }
    }

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
