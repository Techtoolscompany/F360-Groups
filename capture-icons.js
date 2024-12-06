const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Load the HTML file
  await page.goto(`file://${path.join(__dirname, 'icon-generator.html')}`);
  
  // Set viewport for 512x512 icon
  await page.setViewport({ width: 512, height: 512 });
  const icon512 = await page.$('.icon');
  await icon512.screenshot({
    path: 'public/pwa-512x512.png',
    omitBackground: false
  });
  
  // Set viewport for 192x192 icon
  await page.setViewport({ width: 192, height: 192 });
  const icon192 = await page.$('.icon-sm');
  await icon192.screenshot({
    path: 'public/pwa-192x192.png',
    omitBackground: false
  });
  
  // Copy 192x192 as apple-touch-icon
  const fs = require('fs');
  fs.copyFileSync('public/pwa-192x192.png', 'public/apple-touch-icon.png');
  
  await browser.close();
})();
