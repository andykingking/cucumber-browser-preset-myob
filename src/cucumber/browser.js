// eslint-disable-next-line global-require
export const driver = require('selenium-webdriver');

export const browser = new driver.Builder().forBrowser('firefox').build();
