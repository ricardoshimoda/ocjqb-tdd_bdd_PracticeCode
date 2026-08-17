// Environment for Cucumber Testing
const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Export an empty object for now - we'll populate it with environment variables
const environment = {};

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';
const WAIT_SECONDS = parseInt(process.env.WAIT_SECONDS || '60', 10);

BeforeAll(function() {
    // Executed once before all tests
    environment.baseUrl = BASE_URL;
    environment.waitSeconds = WAIT_SECONDS;
    
    // Setup Chrome options for headless testing
    const options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    // Note: Driver will be instantiated in step definitions when needed
    environment.chromeOptions = options;
});

AfterAll(function() {
    // Executed after all tests
});

// Export the environment object so it can be imported by step definitions
module.exports = environment;