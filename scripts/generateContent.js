// scripts/generateContent.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai');
const config = require('../config');

const openai = new OpenAIApi(new Configuration({
  apiKey: config.openaiApiKey,
}));

async function generateBlog(topic) {
  const prompt = `
Write a detailed, SEO-optimized blog post about: "${topic}"
- Include <h1> and <h2> tags
- Write in HTML format
- Add meta description
- Include keywords
- Keep it around 400 words
`;

  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  const html = response.data.choices[0].message.content;

  const fileName = topic.toLowerCase().replace(/\s+/g, '-') + '.html';
  const filePath = path.join(__dirname, '../posts', fileName);
  fs.writeFileSync(filePath, html, 'utf-8');

  return fileName;
}

module.exports = generateBlog;
