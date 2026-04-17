const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function testUI() {
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1280, height: 800 });

  // Catch console logs from the page
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  console.log('Navigating to http://localhost:5173...');
  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 30000 });
    
    const assetsDir = path.join(__dirname, '../assets');
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir);
    }

    // Give it a few more seconds for react to mount
    await new Promise(r => setTimeout(r, 5000));

    const content = await page.content();
    console.log('Page content length:', content.length);
    // console.log('Page content preview:', content.substring(0, 500));

    const screenshotPath = path.join(assetsDir, 'dashboard.png');
    await page.screenshot({ path: screenshotPath });
    console.log(`Screenshot saved to ${screenshotPath}`);

    // Wait for the input
    await page.waitForSelector('input#name', { timeout: 10000 });
    console.log('Input found.');

    await page.type('input#name', 'Sarah');
    await page.click('button.btn-primary');

    console.log('Waiting for card...');
    await page.waitForSelector('.card', { timeout: 20000 });
    console.log('Profile created successfully in UI!');

    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: screenshotPath });
    console.log('Final screenshot updated.');

  } catch (error) {
    console.error('UI Test failed:', error);
    const assetsDir = path.join(__dirname, '../assets');
    if (fs.existsSync(assetsDir)) {
        await page.screenshot({ path: path.join(assetsDir, 'failure_final.png') });
    }
  } finally {
    await browser.close();
  }
}

testUI();
