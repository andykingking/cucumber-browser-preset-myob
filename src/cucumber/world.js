import config from '../config';
import { driver, browser } from './browser';
import Wait from '../selenium/Wait';
import Screenshot from '../selenium/Screenshot';
import PageRegisry from '../pages/Registry';
import FlowRegistry from '../flows/Registry';
import StubRegistry from '../http_stub/Registry';

module.exports = function (worldInitializer, environmentName = process.env.NODE_ENV) {
  return function World() {
    this.config = config.environment(environmentName || 'local');
    this.driver = driver;
    this.browser = browser;

    this.wait = new Wait(this);
    this.screenshot = new Screenshot(this.browser);
    this.screenshot.ensureDirectoryExists();

    this.pageRegistry = new PageRegisry(this);
    this.flowRegistry = new FlowRegistry(this);
    this.stubRegistry = new StubRegistry(this.config);
    worldInitializer(this);
  };
};
