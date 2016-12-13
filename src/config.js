import fs from 'fs';
import path from 'path';
import merge from 'lodash.merge';

class Config {

  static load() {
    const filePath = path.join(process.cwd(), 'features', '.cucumber-browser-rc');
    try {
      return new Config(JSON.parse(fs.readFileSync(filePath)));
    } catch (err) {
      return new Config({});
    }
  }

  constructor(settings) {
    const resolvedSettings = merge(
      {
        browser: {
          preferences: {}
        },
        environments: {
          defaults: {}
        }
      },
      settings
    );
    this._browserPreferences = resolvedSettings.browser.preferences;
    this._environments = resolvedSettings.environments;
  }

  browserPreferences() {
    return this._browserPreferences;
  }

  environment(name) {
    const defaults = this._environments.defaults;
    const environment = this._environments[name];
    const config = environment !== undefined ? merge(defaults, environment) : defaults;
    config.isStubbed = config.stubHost !== undefined;
    return config;
  }

}

export default Config.load();
