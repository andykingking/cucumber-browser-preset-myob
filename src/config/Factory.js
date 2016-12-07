const fs = require('fs');
const merge = require('lodash.merge');

export default class Factory {

  static create(path, defaultEnv) {
    const configForAllEnvironments = this._readConfiguration(path);
    const defaultsConfig = configForAllEnvironments.defaults;
    const environment = process.env.NODE_ENV === undefined ? defaultEnv : process.env.NODE_ENV;
    const environmentConfig = configForAllEnvironments[environment];
    const config = environmentConfig !== undefined ? merge(defaultsConfig, environmentConfig) : defaultsConfig;
    config.isStubbed = config.stubHost !== undefined;
    return config;
  }

  static _readConfiguration(path) {
    const config = JSON.parse(fs.readFileSync(path));
    if (config.defaults === undefined) {
      config.defaults = {};
    }
    return config;
  }

}
