import { browser } from './browser';

module.exports = function () {

  this.Before(() => {
    return this.screenshot.ensureDirectoryExists();
  });

  this.After((scenario) => {
    if (scenario.isFailed()) {
      return this.screenshot.create(`${scenario.getName()} failure`);
    }
    return Promise.resolve('Scenario Succeeded');
  });

  this.After(() => {
    return Promise.all(this.stubRegistry.all().map(stub => stub.reset()));
  });

  this.registerHandler('BeforeFeatures', (features, callback) => {
    browser.isMobileDevice = process.env.SCREEN_SIZE === 'mobile';
    const [width, height] = browser.isMobileDevice ? [640, 1136] : [1280, 1024];
    browser.manage().window().setPosition(0, 0);
    browser.manage().window().setSize(width, height);
    callback();
  });

  this.registerHandler('AfterFeatures', () => {
    return browser.quit();
  });

};
