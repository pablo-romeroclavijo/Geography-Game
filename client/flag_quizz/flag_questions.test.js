const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const $ = require('jquery');

// Load your HTML file into a JSDOM environment
const html = fs.readFileSync(path.resolve(__dirname, './flag_questions.html'), 'utf8');
const dom = new JSDOM(html);
const {window} = dom;

// Initialize jQuery in the JSDOM environment
global.window = window;
global.document = window.document;
global.$ = $;

const {add, createQuestion, addImage, getCountries, checkAnwser, fetchCountries, fetchImage, postScore } = require('./flag_questions.js');

// test('adds 1 + 2 to equal 3', () => {
//   expect(add(1, 2)).toBe(3);
// });

// test('adds 0 + 0 to equal 0', () => {
//   expect(add(0, 0)).toBe(0);
// });

// test('adds -1 + 1 to equal 0', () => {
//   expect(add(-1, 1)).toBe(0);
// });


describe('Function Data Types', () => {
  // Test if createQuestion is a function
  it('createQuestion should be a function', () => {
    expect(typeof createQuestion).toBe('function');
  });

  // Test if addImage is a function
  it('addImage should be a function', () => {
    expect(typeof addImage).toBe('function');
  });

  // Test if getCountries is a function
  it('getCountries should be a function', () => {
    expect(typeof getCountries).toBe('function');
  });

  // Test if checkAnwser is a function
  it('checkAnwser should be a function', () => {
    expect(typeof checkAnwser).toBe('function');
  });

  // Test if fetchCountries is a function
  it('fetchCountries should be a function', () => {
    expect(typeof fetchCountries).toBe('function');
  });

  // Test if fetchImage is a function
  it('fetchImage should be a function', () => {
    expect(typeof fetchImage).toBe('function');
  });

  // Test if postScore is a function
  it('postScore should be a function', () => {
    expect(typeof postScore).toBe('function');
  });

  
});

