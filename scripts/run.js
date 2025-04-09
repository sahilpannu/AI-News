// scripts/run.js
const getTrends = require('./scrapeTrends');
const generateBlog = require('./generateContent');

(async () => {
  const trends = await getTrends();
  for (let trend of trends) {
    console.log(`Generating for: ${trend}`);
    await generateBlog(trend);
  }
})();
