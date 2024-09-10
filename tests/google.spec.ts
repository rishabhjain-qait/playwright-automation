import { test, expect, chromium } from '@playwright/test';

test('Google search test', async () => {
  // Launch Chrome browser
  const browser = await chromium.launch({
    headless: false, // Set to true if you want it to run in headless mode
    channel: 'chrome' // Ensure Chrome is used instead of Chromium
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to Google
  await page.goto('https://www.google.com');

  // Type in the search bar
  // Type in the search bar
  const searchBar = page.locator('textarea[title="Search"]');
  await searchBar.fill('Playwright testing');
  
  // Press 'Enter' to search
  await searchBar.press('Enter');

  await new Promise(resolve => setTimeout(resolve, 10 * 1000));

  // Wait for the search results to load
  await page.waitForSelector('#search');

  // Assert that the results contain the expected text
  const results = page.locator('#search');
  await expect(results).toContainText('Playwright');


  // Close the browser
  await browser.close();
});
