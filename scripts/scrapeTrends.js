// scripts/scrapeTrends.js
const puppeteer = require('puppeteer');

async function getTrends() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://trends.google.com/trends/trendingsearches/daily?geo=US');

  const topics = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('div.feed-list-wrapper div.details-top a')).map(el => el.innerText.trim());
  });

  await browser.close();
  return topics.slice(0, 5); // top 5 trends
}

module.exports = getTrends;
