import CucumberPresets from '../../lib/cucumber-browser-preset-myob';

export default class ResourceList extends CucumberPresets.Page {

  elementLocators = {
    resourceContainer: { id: 'resources' },
    resource: { className: 'resource' },
    resourceLink: { xpath: '//div[@class="resource"]/a' }
  };

  load() {
    return this.browser.get('http://localhost:3000/resource');
  }

  waitUntilVisible() {
    return this.findVisibleElement('resourceContainer');
  }

  numberOfResources() {
    return this.findVisibleElements('resource').then(resources => resources.length);
  }

  waitUntilThereAreNoResources() {
    return this.waitUntilNotFound('resource');
  }

  viewResource(position) {
    return this.findVisibleElements('resourceLink').then(link => link[position - 1].click());
  }

}
