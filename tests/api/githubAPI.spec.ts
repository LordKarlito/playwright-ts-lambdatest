// TESTING THE GITHUB API
// HTTP Headers can be found in the playwright.config file

// Before each test, the file creates a new repo (see beforeAll).
// Then it creates a new issue under the newly created repo and performs an
// assertion by sending a GET request and matching the response to the posted data.
// Finally, it deletes the new repo.

import { test, expect } from '@playwright/test';

const REPO = 'test-repo-1';
const USER = 'LordKarlito';

test.describe.configure({mode: 'serial'})

test.beforeAll(async ({ request }) => {
    // console.log(`${process.env.GITSECRET} ${process.env.EMAIL} ${process.env.PASS}`)
    // CREATE A NEW REPO
    const response = await request.post(`user/repos`, {
        data: {
            name: REPO,
        }
    });
    await expect(response.ok()).toBeTruthy();
});

test.afterAll(async ({ request }) => {
    // DELETE THE REPO
    const response = await request.delete(`/repos/${USER}/${REPO}`);
    await expect(response.ok()).toBeTruthy();
})

test('Create a bug report', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`,{
        data: {
            title: '[Bug] report 1',
            body: 'Bug description',
        }
    });

    expect(newIssue.ok()).toBeTruthy();

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    await expect(issues.ok()).toBeTruthy();

    // For arrays and objects, use expect.objectContaining({someObject}) 
    // or expect.arrayContaining({someArray})
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[Bug] report 1',
        body: 'Bug description'
    }));     
});

test('should create a feature request', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
    data: {
        title: '[Feature] request 1',
        body: 'Feature description',
    }
    });
    await expect(newIssue.ok()).toBeTruthy();

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[Feature] request 1',
        body: 'Feature description'
    })); 
});
