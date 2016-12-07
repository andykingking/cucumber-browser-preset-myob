import CucumberPresets from '../../lib/cucumber-browser-myob-presets';

export default class Resource extends CucumberPresets.Page {

  elementLocators = {
    name: { id: 'name' }
  };

  waitUntilVisible() {
    return this.findVisibleElement('name');
  }

}
