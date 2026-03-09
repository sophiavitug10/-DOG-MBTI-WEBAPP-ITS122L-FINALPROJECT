import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('PAGE CONSOLE ERROR:', msg.text());
    }
  });
  page.on('pageerror', err => {
    console.log('PAGE ERROR EVENT:', err.message);
  });
  await page.goto('http://localhost:5174/login');
  // wait for form-card to show up or timeout
  try {
    await page.waitForSelector('.form-card', { timeout: 3000 });
    console.log('FORM CARD appeared');
  } catch (err) {
    console.log('FORM CARD did not appear');
  }
  const html = await page.content();
  console.log('PAGE HTML LENGTH:', html.length);
  console.log(html.slice(0, 1000));
  await browser.close();
})();