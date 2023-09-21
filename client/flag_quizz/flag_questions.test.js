const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const $ = require('jquery');

// Load your HTML file into a JSDOM environment
const html = fs.readFileSync(path.resolve(__dirname, './flag_questions.html'), 'utf8');
const dom = new JSDOM(html);
const { window } = dom;

// Initialize jQuery in the JSDOM environment
global.window = window;
global.document = window.document;
global.$ = $;

const add = require('./flag_questions.js');

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});

test('adds 0 + 0 to equal 0', () => {
  expect(add(0, 0)).toBe(0);
});

test('adds -1 + 1 to equal 0', () => {
  expect(add(-1, 1)).toBe(0);
});
