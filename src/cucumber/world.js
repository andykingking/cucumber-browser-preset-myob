import ConfigFactory from '../config/Factory';
import { driver, browser } from './browser';
import Wait from '../selenium/Wait';
import Screenshot from '../selenium/Screenshot';
import PageRegisry from '../pages/Registry';
import FlowRegistry from '../flows/Registry';
import StubRegistry from '../http_stub/Registry';

const path = require('path');

module.exports =
  function (worldInitializer, configPath = path.resolve(__dirname, 'config/default.json'), defaultEnv = 'local') {
    return function World() {
      this.config = ConfigFactory.create(configPath, defaultEnv);
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
