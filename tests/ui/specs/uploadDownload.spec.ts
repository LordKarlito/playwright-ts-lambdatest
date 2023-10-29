import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Upload and Download', () => {
    
    test('download', async ({ page, baseURL }) => {
        await page.goto(`${baseURL}/generate-file-to-download-demo`)

        const myTextbox = page.getByRole('textbox')
        myTextbox.type('TEST DOWNLOAD!');

        await page.getByRole('button', {name: 'Generate File'}).click();
        // await page.locator('#link-to-download').click();

        const download = await Promise.all([
            // await is not used inside promise
            page.waitForEvent("download"),
            page.click('#link-to-download')
        ]);

        const fileName = download[0].suggestedFilename()
        await download[0].saveAs(fileName);

        // const path = await download[0].path();
        // console.log(path);
    });

    test('upload - single', async ({ page, baseURL }) => {
        await page.goto('https://blueimp.github.io/jQuery-File-Upload/')

        const filename = 'testFileForUpload.png'
        
        await expect(page.getByRole('table')).toBeHidden();
        await page.setInputFiles('input[type="file"]', filename);

        await expect(page.getByRole('table')).toBeVisible();
        await expect(page.getByRole('cell').nth(1)).toHaveText(filename);
    });

    test('upload - multiple', async ({ page }) => {
        await page.goto('https://blueimp.github.io/jQuery-File-Upload/')

        const filename1 = 'testFileForUpload.png'
        const filename2 = 'testFileForUpload2.png'
        
        await expect(page.getByRole('table')).toBeHidden();

        const [uploadFiles] = await Promise.all([
            page.waitForEvent('filechooser'),
            page.click('input[type="file"]')
        ]);

        const isMultiple = uploadFiles.isMultiple()
        uploadFiles.setFiles(
            [filename1, filename2]
        );

        await expect(page.getByRole('table')).toBeVisible();

        await expect(page.getByRole('row').first().getByRole('cell').nth(1)).toHaveText(filename1);
        
        await expect(page.getByRole('row').nth(1).getByRole('cell').nth(1)).toHaveText(filename2);
    });
    
    
});
