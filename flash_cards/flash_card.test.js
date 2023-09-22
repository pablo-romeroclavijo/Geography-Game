const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const $ = require('jquery');

// Load your HTML file into a JSDOM environment
const html = fs.readFileSync(path.resolve(__dirname, './flash_cards.html'), 'utf8');
const dom = new JSDOM(html);
const {window} = dom;

// Initialize jQuery in the JSDOM environment
global.window = window;
global.document = window.document;
global.$ = $;

const { addImage, getCountry, fetchCountry, fetchImage, } = require('./flash_cards')

describe('Test if functions are functions', () => {
    it('should check if addImage is a function', () => {
      expect(typeof addImage).toBe('function');
    });
  
    it('should check if getCountry is a function', () => {
      expect(typeof getCountry).toBe('function');
    });
  
    it('should check if fetchCountry is a function', () => {
      expect(typeof fetchCountry).toBe('function');
    });
  
    it('should check if fetchImage is a function', () => {
      expect(typeof fetchImage).toBe('function');
    });
  });
  