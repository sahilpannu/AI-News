// scripts/run.js
import getTrends from '../scrapeTrends.js';
const generateBlog = require('./generateContent');

(async () => {
  const trends = await getTrends();
  for (let trend of trends) {
    console.log(`Generating for: ${trend}`);
    await generateBlog(trend);
  }
})();
