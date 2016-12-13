import CucumberPresets from '../../lib/cucumber-browser-preset-myob';

export default class Resource extends CucumberPresets.Page {

  elementLocators = {
    name: { id: 'name' }
  };

  waitUntilVisible() {
    return this.findVisibleElement('name');
  }

}
