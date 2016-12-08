import ApplicationConfig from '../config/Application';
import { driver, browser } from './browser';
import Wait from '../selenium/Wait';
import Screenshot from '../selenium/Screenshot';
import PageRegisry from '../pages/Registry';
import FlowRegistry from '../flows/Registry';
import StubRegistry from '../http_stub/Registry';

const path = require('path');

const defaultConfigFilePath = path.resolve(__dirname, 'config/application_default.json');

module.exports = function (worldInitializer, configPath = defaultConfigFilePath, defaultEnv = 'local') {
  return function World() {
    this.config = ApplicationConfig.load(configPath, defaultEnv);
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
