const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const $ = require('jquery');

// Load your HTML file into a JSDOM environment
const html = fs.readFileSync(path.resolve(__dirname, './map_quiz.html'), 'utf8');
const dom = new JSDOM(html);
const {window} = dom;

// Initialize jQuery in the JSDOM environment
global.window = window;
global.document = window.document;
global.$ = $;

const { submituser, startQuiz, generateOption, nextq, checkAnwser, showScore, addImage, nextcountries, getCountries, fetchCountries, fetchImage,postScore } = require('./map_quiz.js');
  

describe('Test if functions are functions', () => {
    it('should check if submituser is a function', () => {
      expect(typeof submituser).toBe('function');
    });
  
    it('should check if startQuiz is a function', () => {
      expect(typeof startQuiz).toBe('function');
    });
  
    it('should check if generateOption is a function', () => {
      expect(typeof generateOption).toBe('function');
    });
  
    it('should check if nextq is a function', () => {
      expect(typeof nextq).toBe('function');
    });
  
    it('should check if checkAnwser is a function', () => {
      expect(typeof checkAnwser).toBe('function');
    });
  
    it('should check if showScore is a function', () => {
      expect(typeof showScore).toBe('function');
    });
  
    it('should check if addImage is a function', () => {
      expect(typeof addImage).toBe('function');
    });
  
    it('should check if nextcountries is a function', () => {
      expect(typeof nextcountries).toBe('function');
    });
  
    it('should check if getCountries is a function', () => {
      expect(typeof getCountries).toBe('function');
    });
  
    it('should check if fetchCountries is a function', () => {
      expect(typeof fetchCountries).toBe('function');
    });
  
    it('should check if fetchImage is a function', () => {
      expect(typeof fetchImage).toBe('function');
    });
  
    it('should check if postScore is a function', () => {
      expect(typeof postScore).toBe('function');
    });
  });
  