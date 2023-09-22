const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const $ = require('jquery');

// Load your HTML file into a JSDOM environment
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
const dom = new JSDOM(html);
const {window} = dom;

// Initialize jQuery in the JSDOM environment
global.window = window;
global.document = window.document;
global.$ = $;

const { showSlide, nextSlide, generateCarousel, addImage, createScoreTable, fetchScoreBoard, fetchImage } = require('./index.js')

describe('Test if functions are functions', () => {
    it('should check if showSlide is a function', () => {
      expect(typeof showSlide).toBe('function');
    });
  
    it('should check if nextSlide is a function', () => {
      expect(typeof nextSlide).toBe('function');
    });
  
    it('should check if generateCarousel is a function', () => {
      expect(typeof generateCarousel).toBe('function');
    });
  
    it('should check if addImage is a function', () => {
      expect(typeof addImage).toBe('function');
    });
  
    it('should check if createScoreTable is a function', () => {
      expect(typeof createScoreTable).toBe('function');
    });
  
    it('should check if fetchScoreBoard is a function', () => {
      expect(typeof fetchScoreBoard).toBe('function');
    });
  
    it('should check if fetchImage is a function', () => {
      expect(typeof fetchImage).toBe('function');
    });
  });
  