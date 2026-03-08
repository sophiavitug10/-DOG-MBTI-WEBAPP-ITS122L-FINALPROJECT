const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5174/login');
  const html = await page.content();
  console.log('PAGE HTML LENGTH:', html.length);
  console.log(html.slice(0, 1000));
  await browser.close();
})();