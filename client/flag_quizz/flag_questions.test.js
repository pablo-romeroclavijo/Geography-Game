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

const { createQuestion, addImage, getCountries, checkAnwser, fetchCountries, fetchImage, postScore } = require('./flag_questions.js');

// Mock the fetch function
global.fetch = jest.fn();


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

  it('createQuestion should be a function', () => {
    expect(typeof createQuestion).toBe('function');
  });

  it('addImage should be a function', () => {
    expect(typeof addImage).toBe('function');
  });

  it('getCountries should be a function', () => {
    expect(typeof getCountries).toBe('function');
  });

  it('checkAnwser should be a function', () => {
    expect(typeof checkAnwser).toBe('function');
  });

  it('fetchCountries should be a function', () => {
    expect(typeof fetchCountries).toBe('function');
  });

  it('fetchImage should be a function', () => {
    expect(typeof fetchImage).toBe('function');
  });

  it('postScore should be a function', () => {
    expect(typeof postScore).toBe('function');
  });

  it('should fetch an image and call addImage on success', async () => {
    // Mock a successful fetch response
    global.fetch.mockResolvedValue({
      ok: true,
      blob: jest.fn(async () => new Blob()), // Mock a blob
    });

    // Mock addImage function
    const addImage = jest.fn();

    // Call the function
    await fetchImage('flags', 123);

    // Check if fetch is called with the correct URL
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/image/flags/123');

    // Check if addImage is called with the expected arguments
    expect(addImage).toHaveBeenCalledWith(expect.any(String), 123);
  });

  it('should throw an error on a failed fetch', async () => {
    // Mock a failed fetch response
    global.fetch.mockResolvedValue({
      ok: false,
      status: 404,
    });

    // Call the function
    try {
      await fetchImage('flags', 123);
    } catch (error) {
      // Check if the error message matches
      expect(error).toEqual('Error status: 404');
    }
  });
  
});

